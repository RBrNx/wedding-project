const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const redirect = async (event, s3, bucket_name, callback) => {
  const request = event.Records[0].cf.request;
  const uri = request.uri;

  console.log({ uri });

  // prevents default root object from redirecting to infinity and beyond
  if (uri === '/index.html') {
    callback(null, request);
  } else if (uri.endsWith('/')) {
    request.uri += 'index.html';
    callback(null, request);
  } else if (uri.endsWith('/index.html')) {
    const response = {
      status: '301',
      headers: {
        location: [
          {
            key: 'Location',
            value: uri.slice(0, -10),
          },
        ],
      },
    };

    callback(null, response);
  } else if (uri.indexOf('.') > -1) {
    callback(null, request);
  } else {
    const params = {
      Bucket: bucket_name,
      Key: uri.slice(1), // the slice removes the first / from the string
    };

    // this function returns an error when an object is not found (404)
    await s3
      .headObject(params)
      .promise()
      .then(data => {
        callback(null, request);
      })
      .catch(error => {
        const response = {
          status: '301',
          headers: {
            location: [
              {
                key: 'Location',
                value: uri + '/',
              },
            ],
          },
        };

        callback(null, response);
      });
  }
};

exports.handler = async (event, context, callback) => {
  // Extract the request from the CloudFront event that is sent to Lambda@Edge
  var request = event.Records[0].cf.request;

  // Extract the URI from the request
  var olduri = request.uri;

  // Match any '/' that occurs at the end of a URI. Replace it with a default index
  var newuri = olduri.replace(/\/$/, '/index.html');

  // Log the URI as received by CloudFront and the new URI to be used to fetch from origin
  console.log('Old URI: ' + olduri);
  console.log('New URI: ' + newuri);

  // Replace the received URI with the URI that includes the index page
  request.uri = newuri;

  // Return to CloudFront
  return callback(null, request);
};
