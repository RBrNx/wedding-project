import GuestResolvers from './resolvers/Guest';
import InvitationResolvers from './resolvers/Invitation';
import QuestionResolvers from './resolvers/Question';
import BaseTypeDefs from './typeDefs/Base';
import GuestTypeDefs from './typeDefs/Guest';
import InvitationTypeDefs from './typeDefs/Invitation';
import QuestionTypeDefs from './typeDefs/Question';

const typeDefs = [BaseTypeDefs, GuestTypeDefs, InvitationTypeDefs, QuestionTypeDefs];

const resolvers = [GuestResolvers, InvitationResolvers, QuestionResolvers];

export { typeDefs, resolvers };
