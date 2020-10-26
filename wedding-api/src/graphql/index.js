import { splitResolverGroups, splitTypedefGroups } from '../lib/apollo';
import GuestResolvers from './resolvers/Guest';
import InvitationResolvers from './resolvers/Invitation';
import QuestionResolvers from './resolvers/Question';
import BaseTypeDefs from './typeDefs/Base';
import GuestTypeDefs from './typeDefs/Guest';
import InvitationTypeDefs from './typeDefs/Invitation';
import QuestionTypeDefs from './typeDefs/Question';

const resolverGroups = [GuestResolvers, InvitationResolvers, QuestionResolvers];
const typeDefGroups = [BaseTypeDefs, GuestTypeDefs, InvitationTypeDefs, QuestionTypeDefs];

const { coreResolvers, authenticatedResolvers } = splitResolverGroups(resolverGroups)
const { coreTypeDefs, authenticatedTypeDefs } = splitTypedefGroups(typeDefGroups)

export { coreResolvers, authenticatedResolvers, coreTypeDefs, authenticatedTypeDefs }
