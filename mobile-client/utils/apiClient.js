import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Constants from 'expo-constants';
import { Auth } from 'aws-amplify';
import awsSigV4Client from './awsClient';

const { API_URL } = Constants.manifest.extra;

// const apolloClient = new ApolloClient({
//   link: new HttpLink({
//     uri: API_URL,
//     fetch: async (uri, options = {}) => {
//       const { method, body, headers } = options;
//       const { accessKeyId, secretAccessKey, sessionToken } = await Auth.currentCredentials();

//       const awsClient = awsSigV4Client.newClient({
//         accessKey: accessKeyId,
//         secretKey: secretAccessKey,
//         sessionToken,
//         region: 'eu-west-2',
//         endpoint: API_URL,
//       });

//       const signedRequest = awsClient.signRequest({ method, path: '', headers, body });

//       return fetch(uri, { ...options, headers: signedRequest.headers });
//     },
//   }),
//   // uri: API_URL,
//   // request: async operation => {
//   //   let headers;

//   //   try {
//   //     const { accessToken } = await Auth.currentSession();
//   //     const { jwtToken } = accessToken;
//   //     headers = { authorization: `Bearer ${jwtToken}` };
//   //   } catch {
//   //     const { accessKeyId, secretAccessKey, sessionToken } = await Auth.currentCredentials();

//   //     const awsClient = awsSigV4Client.newClient({
//   //       accessKey: accessKeyId,
//   //       secretKey: secretAccessKey,
//   //       sessionToken,
//   //       region: 'eu-west-2',
//   //       endpoint: API_URL,
//   //     });

//   //     const signedRequest = awsClient.signRequest({ method: 'POST', path: '' });
//   //     headers = signedRequest.headers;
//   //   } finally {
//   //     console.log({ headers });
//   //     operation.setContext({ headers });
//   //   }

//   // if (accessToken) {
//   //   console.log({ accessToken });
//   //   const { jwtToken } = accessToken;
//   //   token = jwtToken;
//   // } else {
//   //   const unauthUser = await Auth.currentCredentials();
//   //   console.log({ unauthUser });
//   // }

//   // return {
//   //   headers: {
//   //     ...headers,
//   //     authorization: token ? `Bearer ${token}` : '',
//   //   },
//   // };
//   // },
// });

const httpLink = new HttpLink({
  uri: API_URL,
  fetch: async (uri, options = {}) => {
    const { method, body, headers } = options;
    const { accessKeyId, secretAccessKey, sessionToken } = await Auth.currentCredentials();

    // console.log({ gqlHeaders: headers });

    const awsClient = awsSigV4Client.newClient({
      accessKey: accessKeyId,
      secretKey: secretAccessKey,
      sessionToken,
      region: 'eu-west-2',
      endpoint: API_URL,
    });

    const signedRequest = awsClient.signRequest({
      method,
      path: '',
      headers,
      body,
      // queryParams: { Action: 'ListUsers', Version: '2010-05-08' },
    });

    console.log({ headers: signedRequest.headers });

    return fetch(uri, { ...options, headers: signedRequest.headers, body });
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
