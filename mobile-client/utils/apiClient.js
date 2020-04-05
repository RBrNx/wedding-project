import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const { API_URL } = Constants.manifest.extra;

const client = new ApolloClient({
  uri: API_URL,
});

export default client;
