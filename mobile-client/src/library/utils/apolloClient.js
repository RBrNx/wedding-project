import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Constants from 'expo-constants';
import { Auth } from 'aws-amplify';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import awsSigV4Fetch from './awsSigV4Fetch';

const { BASE_API_URL, AUTH_ENDPOINT, UNAUTH_ENDPOINT } = Constants.manifest.extra;

const httpLink = new HttpLink({
  uri: BASE_API_URL,
  fetch: async (uri, options = {}) => {
    try {
      const { authenticated } = await Auth.currentUserCredentials();
      const endpoint = authenticated ? AUTH_ENDPOINT : UNAUTH_ENDPOINT;

      const apiUrl = `${uri}${endpoint}`;
      return awsSigV4Fetch(apiUrl, options);
    } catch (err) {
      console.log('Error in Fetch', { err });
      return false;
    }
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`),
    );

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
