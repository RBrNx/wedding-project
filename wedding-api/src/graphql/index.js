import UserResolvers from './resolvers/User';
import InvitationResolvers from './resolvers/Invitation';
import QuestionResolvers from './resolvers/Question';
import BaseTypeDefs from './typeDefs/Base';
import UserTypeDefs from './typeDefs/User';
import InvitationTypeDefs from './typeDefs/Invitation';
import QuestionTypeDefs from './typeDefs/Question';

const typeDefs = [BaseTypeDefs, UserTypeDefs, InvitationTypeDefs, QuestionTypeDefs];

const resolvers = [UserResolvers, InvitationResolvers, QuestionResolvers];

export { typeDefs, resolvers };
