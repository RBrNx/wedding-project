import { filterResolvers } from '../lib/apollo';
import GuestResolvers from './resolvers/Guest';
import InvitationResolvers from './resolvers/Invitation';
import QuestionResolvers from './resolvers/Question';

const resolverGroups = [GuestResolvers, InvitationResolvers, QuestionResolvers];

const { coreResolvers, authenticatedResolvers } = resolverGroups.reduce((result, resolverGroup) => {
  result.coreResolvers = {
    Query: {
      ...result.coreResolvers.Query,
      ...filterResolvers(resolverGroup.queries)
    },
    Mutation: {
      ...result.coreResolvers.Mutation,
      ...filterResolvers(resolverGroup.mutations)
    }
  }

  result.authenticatedResolvers = {
    Query: {
      ...result.authenticatedResolvers.Query,
      ...filterResolvers(resolverGroup.queries, { authenticated: true })
    },
    Mutation: {
      ...result.authenticatedResolvers.Mutation,
      ...filterResolvers(resolverGroup.mutations, { authenticated: true })
    }
  }
  
  return result;
}, { coreResolvers: {}, authenticatedResolvers: {} })

export { authenticatedResolvers, coreResolvers }
