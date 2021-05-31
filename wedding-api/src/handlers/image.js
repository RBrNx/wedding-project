import S3 from 'aws-sdk/clients/s3';
import { nanoid } from 'nanoid';
import sharp from 'sharp';
import { getUserFromRequest } from '../lib/helpers/users';
import { isValidImageContentType, getSupportedContentTypes, getFileSuffixForContentType } from '../lib/helpers/image';
import { connectToDatabase } from '../lib/database';

const { S3_PHOTOS_BUCKET, CDN_DOMAIN_NAME } = process.env;
const s3 = new S3();

exports.initiateUpload = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const currentUser = await getUserFromRequest(event.requestContext);
  const eventId = currentUser.eventId.toString();
  const albumId = nanoid();
  const images = JSON.parse(event.body || '[]');

  const results = await Promise.all(
    images.map(async metadata => {
      const { contentType } = metadata;

      if (!isValidImageContentType(contentType)) {
        const contentTypes = getSupportedContentTypes().join(',');
        return callback(null, {
          statusCode: 400,
          body: JSON.stringify({
            message: `Invalid contentType for image. Valid values are: ${contentTypes}; Received: ${contentType}`,
          }),
        });
      }

      // Create the PutObjectRequest that will be embedded in the signed URL
      const photoId = nanoid();
      const fileSuffix = getFileSuffixForContentType(contentType);
      const req = {
        Bucket: S3_PHOTOS_BUCKET,
        Key: `uploads/event_${eventId}/${photoId}.${fileSuffix}`,
        ContentType: contentType,
        CacheControl: 'max-age=31557600', // instructs CloudFront to cache for 1 year
        // Set Metadata fields to be retrieved post-upload and stored in MongoDB
        Metadata: {
          ...metadata,
          albumId,
          photoId,
          eventId,
        },
      };

      // Get the signed URL from S3 and return to client
      const s3PutObjectUrl = await s3.getSignedUrlPromise('putObject', req);
      return {
        photoId,
        s3PutObjectUrl,
      };
    }),
  );

  return {
    statusCode: 201,
    body: JSON.stringify(results),
  };
};

exports.processUpload = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const s3Record = event.Records[0].s3;
  const s3Object = await s3.getObject({ Bucket: s3Record.bucket.name, Key: s3Record.object.key }).promise();

  if (!s3Object.Metadata) {
    const errorMessage = 'Cannot process photo as no metadata is set for it';
    throw new Error(errorMessage);
  }

  const imageData = s3Object.Body;
  const resizedImageData = await sharp(imageData)
    .resize(300, 300)
    .toFormat('jpeg')
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
  const [filePath, extension] = s3Record.object.key.split('.');
  const thumbnailKey = `${filePath}_thumbnail.${extension}`.replace('uploads/', '');

  await s3.putObject({ Bucket: s3Record.bucket.name, Key: thumbnailKey, Body: resizedImageData });

  // S3 metadata field names are converted to lowercase, so need to map them out carefully
  const photoDetails = {
    albumId: s3Object.Metadata.albumid,
    photoId: s3Object.Metadata.photoid,
    eventId: s3Object.Metadata.eventid,
    contentType: s3Object.Metadata.contenttype,
    // Map the S3 bucket key to a CloudFront URL to be stored in the DB
    url: `https://${CDN_DOMAIN_NAME}/${s3Record.object.key}`,
    thumbnail: `https://${CDN_DOMAIN_NAME}/${thumbnailKey}`,
  };

  const db = await connectToDatabase();
  const MemoryModel = db.model('Memory');
  const Memory = new MemoryModel(photoDetails);
  await Memory.save();
};
