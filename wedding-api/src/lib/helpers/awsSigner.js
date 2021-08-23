import AWS from 'aws-sdk';

const { KEY_PAIR_ID, CLOUDFRONT_SIGNER_PRIVATE_KEY } = process.env;
const signer = new AWS.CloudFront.Signer(KEY_PAIR_ID, CLOUDFRONT_SIGNER_PRIVATE_KEY);

export default signer;
