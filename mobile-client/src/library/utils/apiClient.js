import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Constants from 'expo-constants';
import { Auth } from 'aws-amplify';
import { createAwsClient } from 'agnostic-aws-signature';

const { BASE_API_URL, AUTH_ENDPOINT, UNAUTH_ENDPOINT } = Constants.manifest.extra;

const httpLink = new HttpLink({
  uri: BASE_API_URL,
  fetch: async (uri, options = {}) => {
    const { method, body, headers } = options;

    try {
      const { accessKeyId, secretAccessKey, sessionToken, authenticated } = await Auth.currentUserCredentials();
      const endpoint = authenticated ? AUTH_ENDPOINT : UNAUTH_ENDPOINT;

      const awsClient = createAwsClient(accessKeyId, secretAccessKey, sessionToken, {
        region: 'eu-west-2',
        endpoint: BASE_API_URL,
      });

      const signedRequest = awsClient.signRequest({
        method,
        headers,
        body,
        path: endpoint,
      });

      const requestHeaders = signedRequest.headers;
      const apiUrl = `${uri}${endpoint}`;

      return fetch(apiUrl, { ...options, headers: requestHeaders, body });
    } catch (err) {
      console.log('Error in Fetch', { err });
      return false;
    }
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
