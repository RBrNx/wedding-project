import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Constants from 'expo-constants';
import * as Auth from 'aws-amplify/auth';
import awsSigV4Fetch from './awsSigV4Fetch';

const { BASE_API_URL, AUTH_ENDPOINT, UNAUTH_ENDPOINT } = Constants.expoConfig.extra;

const checkAuthenticated = async () => {
  try {
    const session = await Auth.fetchAuthSession();

    return !!session;
  } catch (err) {
    return false;
  }
};

const httpLink = new HttpLink({
  uri: BASE_API_URL,
  fetch: async (uri, options = {}) => {
    try {
      const authenticated = await checkAuthenticated();
      const endpoint = authenticated ? AUTH_ENDPOINT : UNAUTH_ENDPOINT;

      const apiUrl = `${uri}${endpoint}`;
      return awsSigV4Fetch(apiUrl, options);
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
