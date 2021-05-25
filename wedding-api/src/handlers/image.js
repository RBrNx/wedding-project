import S3 from 'aws-sdk/clients/s3';
import { nanoid } from 'nanoid';
import { getUserFromRequest } from '../lib/helpers/users';
import { isValidImageContentType, getSupportedContentTypes, getFileSuffixForContentType } from '../lib/helpers/image';
import { connectToDatabase } from '../lib/database';

const { S3_PHOTOS_BUCKET, CDN_DOMAIN_NAME } = process.env;
const s3 = new S3();

exports.initiateUpload = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const currentUser = await getUserFromRequest(event.requestContext);
  const eventId = currentUser.eventId.toString();
  const body = JSON.parse(event.body || '{}');
  const photoMetadata = {
    contentType: body.contentType,
    title: body.title,
    description: body.description,
  };
  if (!isValidImageContentType(photoMetadata.contentType)) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: `Invalid contentType for image. Valid values are: ${getSupportedContentTypes().join(',')}; Recieved: ${
          photoMetadata.contentType
        }`,
      }),
    });
  }

  // Create the PutObjectRequest that will be embedded in the signed URL
  const photoId = nanoid();
  const req = {
    Bucket: S3_PHOTOS_BUCKET,
    Key: `event_${eventId}/${photoId}.${getFileSuffixForContentType(photoMetadata.contentType)}`,
    ContentType: photoMetadata.contentType,
    CacheControl: 'max-age=31557600', // instructs CloudFront to cache for 1 year
    // Set Metadata fields to be retrieved post-upload and stored in DynamoDB
    Metadata: {
      ...photoMetadata,
      photoId,
      eventId,
    },
  };
  // // Get the signed URL from S3 and return to client
  const s3PutObjectUrl = await s3.getSignedUrlPromise('putObject', req);
  const result = {
    photoId,
    s3PutObjectUrl,
  };
  return {
    statusCode: 201,
    body: JSON.stringify(result),
  };
};

exports.processUpload = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const s3Record = event.Records[0].s3;
  const s3Object = await s3.headObject({ Bucket: s3Record.bucket.name, Key: s3Record.object.key }).promise();

  if (!s3Object.Metadata) {
    const errorMessage = 'Cannot process photo as no metadata is set for it';
    throw new Error(errorMessage);
  }

  // S3 metadata field names are converted to lowercase, so need to map them out carefully
  const photoDetails = {
    photoId: s3Object.Metadata.photoid,
    eventId: s3Object.Metadata.eventid,
    description: s3Object.Metadata.description,
    title: s3Object.Metadata.title,
    contentType: s3Object.Metadata.contenttype,
    // Map the S3 bucket key to a CloudFront URL to be stored in the DB
    url: `https://${CDN_DOMAIN_NAME}/${s3Record.object.key}`,
  };

  const db = await connectToDatabase();
  const MemoryModel = db.model('Memory');
  const Memory = new MemoryModel(photoDetails);
  await Memory.save();
};
