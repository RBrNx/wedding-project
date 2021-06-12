import Constants from 'expo-constants';
import { Auth } from 'aws-amplify';
import { createAwsClient } from 'agnostic-aws-signature';

const { BASE_API_URL } = Constants.manifest.extra;

const awsSigV4Fetch = async (uri, options = {}) => {
  const { method, body, headers } = options;
  const { pathname } = new URL(uri);

  try {
    const { accessKeyId, secretAccessKey, sessionToken } = await Auth.currentUserCredentials();

    const awsClient = createAwsClient(accessKeyId, secretAccessKey, sessionToken, {
      region: 'eu-west-2',
      endpoint: BASE_API_URL,
    });

    const signedRequest = awsClient.signRequest({
      method,
      headers,
      body,
      path: pathname.replace('/', ''),
    });

    const requestHeaders = signedRequest.headers;

    return fetch(uri, { ...options, headers: requestHeaders, body });
  } catch (err) {
    console.log('Error in Fetch', { err });
    return false;
  }
};

export default awsSigV4Fetch;
