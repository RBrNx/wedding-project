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

const splitResolverGroups = (resolverGroups) => {
  const initialState = {
    coreResolvers: {},
    authenticatedResolvers: {},
  }

  return resolverGroups.reduce((result, resolverGroup) => {
    result.coreResolvers.Query = {
      ...result.coreResolvers.Query,
      ...filterResolvers(resolverGroup.queries)
    }
    result.coreResolvers.Mutation = {
      ...result.coreResolvers.Mutation,
      ...filterResolvers(resolverGroup.mutations)
    }
  
    result.authenticatedResolvers.Query = {
      ...result.authenticatedResolvers.Query,
      ...filterResolvers(resolverGroup.queries, { authenticated: true })
    }
    result.authenticatedResolvers.Mutation = {
      ...result.authenticatedResolvers.Mutation,
      ...filterResolvers(resolverGroup.mutations, { authenticated: true })
    }
    
    return result;
  }, initialState)
}

const splitTypedefGroups = (typeDefGroups) => {
  const initialState = {
    coreTypeDefs: [],
    authenticatedTypeDefs: [],
  }

  return typeDefGroups.reduce((result, typeDefGroup) => {
    const { coreSchema, authenticatedSchema } = typeDefGroup;

    if(coreSchema) result.coreTypeDefs = [...result.coreTypeDefs, coreSchema];
    if(authenticatedSchema) result.authenticatedTypeDefs = [...result.authenticatedTypeDefs, authenticatedSchema];
    
    return result;
  }, initialState)
}

export { generateApolloServer, filterResolvers, splitResolverGroups, splitTypedefGroups }