import S3 from 'aws-sdk/clients/s3.js';

const s3 = new S3();

const Bucket = 'watson-wedding-photos';
const Prefix = 'temp';

(async function () {
  const { Contents } = await s3.listObjectsV2({ Bucket, Prefix }).promise();

  await Promise.all(
    Contents.map(async ({ Key }) => {
      const { Metadata } = await s3.headObject({ Bucket, Key }).promise();
      const filename = Key.replace(`${Prefix}/`, '');
      const filepath = `uploads/event_611177b070b9c7e8a63d8a91/${filename}`;

      console.log(`Copying ${Bucket}/${Key} to ${filepath}`);

      return s3
        .copyObject({
          Bucket,
          CopySource: `${Bucket}/${Key}`,
          Key: `uploads/event_611177b070b9c7e8a63d8a91/${filename}`,
          Metadata: { ...Metadata, eventid: '611177b070b9c7e8a63d8a91', uploadedby: '611178ce53de68eb461e82b8' },
          MetadataDirective: 'REPLACE',
        })
        .promise();
    }),
  );
})();
