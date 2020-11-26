import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs, resolvers, unauthenticatedTypeDefs, unauthenticatedResolvers } from './graphql/index';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    return error;
  },
  formatResponse: response => {
    return response;
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  tracing: false,
  playground: true,
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
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  tracing: false,
  playground: true,
});

exports.authenticatedGQLHandler = (event, context, callback) => {
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
