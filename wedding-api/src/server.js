import { ApolloServer } from 'apollo-server-lambda';
import SpotifyAPI from './datasources/SpotifyAPI';
import { typeDefs, resolvers, unauthenticatedTypeDefs, unauthenticatedResolvers } from './graphql/index';
import { connectToDatabase } from './lib/database';
import { getUserFromRequest } from './lib/helpers/users';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    spotifyAPI: new SpotifyAPI(),
  }),
  formatError: error => {
    return error;
  },
  formatResponse: response => {
    return response;
  },
  context: async ({ event, context }) => {
    const { requestContext } = event;
    const currentUser = await getUserFromRequest(requestContext);
    const db = await connectToDatabase();

    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      currentUser,
      db,
    };
  },
  tracing: false,
  playground: {
    endpoint: '/admin',
  },
});

const unauthenticatedServer = new ApolloServer({
  typeDefs: unauthenticatedTypeDefs,
  resolvers: unauthenticatedResolvers,
  formatError: error => {
    return error;
  },
  formatResponse: response => {
    return response;
  },
  context: async ({ event, context }) => {
    const db = await connectToDatabase();

    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      db,
    };
  },
  tracing: false,
  playground: {
    endpoint: '/api',
  },
});

exports.authenticatedGQLHandler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const handler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
      methods: ['POST', 'GET'],
      allowedHeaders: ['Content-Type', 'Origin', 'Accept'],
    },
  });
  return handler(event, context, callback);
};

const abc = 'boooo';

exports.unauthenticatedGQLHandler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const handler = unauthenticatedServer.createHandler({
    cors: {
      origin: '*',
      credentials: true,
      methods: ['POST', 'GET'],
      allowedHeaders: ['Content-Type', 'Origin', 'Accept'],
    },
  });
  return handler(event, context, callback);
};
