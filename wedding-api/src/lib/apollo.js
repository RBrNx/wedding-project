import { ApolloServer } from "apollo-server-lambda";

const generateApolloServer = ({ typeDefs, resolvers }) => {
  if (!process.env.MONGODB_URI) {
    console.log('Error: Missing .env variables');
    process.exit(1);
  }

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
    playground: true,
  });

  return server;
};

const filterResolvers = (resolverObjects, options = {}) => {
  const { authenticated } = options;

  return resolverObjects.reduce((result, resolverObj) => {
    if(!!resolverObj.authenticated === !!authenticated){
      result[resolverObj.resolver.name] = resolverObj.resolver;
    }

    return result;
  }, {})
}

export { generateApolloServer, filterResolvers }