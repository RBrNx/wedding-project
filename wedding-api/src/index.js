import { ApolloServer } from 'apollo-server-lambda';
import coreTypeDefs from './coreTypeDefs';
import coreResolvers from './coreResolvers';
import authenticatedTypeDefs from './authenticatedTypeDefs';
import authenticatedResolvers from './authenticatedResolvers';

const generateApolloServer = ({ authenticated = false }) => {
  const typeDefs = [coreTypeDefs];
  if (authenticated) typeDefs.push(authenticatedTypeDefs);

  const resolvers = [coreResolvers];
  if (authenticated) resolvers.push(authenticatedResolvers);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      return error;
    },
    formatResponse: (response) => {
      return response;
    },
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
    }),
    tracing: false,
    playground: false,
  });

  return server;
};

const unauthenticatedServer = generateApolloServer();
const authenticatedServer = generateApolloServer({ authenticated: true });

exports.unauthenticatedGQLHandler = (event, context, callback) => {
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

exports.authenticatedGQLHandler = (event, context, callback) => {
  const handler = authenticatedServer.createHandler({
    cors: {
      origin: '*',
      credentials: true,
      methods: ['POST', 'GET'],
      allowedHeaders: ['Content-Type', 'Origin', 'Accept'],
    },
  });
  return handler(event, context, callback);
};
