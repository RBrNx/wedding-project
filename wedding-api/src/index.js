import { coreResolvers, authenticatedResolvers, coreTypeDefs, authenticatedTypeDefs } from './graphql/index';
import { generateApolloServer } from './lib/apollo';

const unauthenticatedServer = generateApolloServer({ resolvers: [coreResolvers], typeDefs: [...coreTypeDefs] });
const authenticatedServer = generateApolloServer({ resolvers: [coreResolvers, authenticatedResolvers], typeDefs: [...coreTypeDefs, ...authenticatedTypeDefs] });

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
