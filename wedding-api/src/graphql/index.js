import { splitResolverGroups } from '../lib/apollo';
import GuestResolvers from './resolvers/Guest';
import InvitationResolvers from './resolvers/Invitation';
import QuestionResolvers from './resolvers/Question';

const resolverGroups = [GuestResolvers, InvitationResolvers, QuestionResolvers];

const { coreResolvers, authenticatedResolvers } = splitResolverGroups(resolverGroups)

export { authenticatedResolvers, coreResolvers }
