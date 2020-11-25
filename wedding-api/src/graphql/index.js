import BaseResolvers from './resolvers/Base';
import UserResolvers from './resolvers/User';
import InvitationResolvers from './resolvers/Invitation';
import QuestionResolvers from './resolvers/Question';
import EventResolvers from './resolvers/Event';
import BaseTypeDefs from './typeDefs/Base';
import UserTypeDefs from './typeDefs/User';
import InvitationTypeDefs from './typeDefs/Invitation';
import QuestionTypeDefs from './typeDefs/Question';
import EventTypeDefs from './typeDefs/Event';

const typeDefs = [BaseTypeDefs, UserTypeDefs, InvitationTypeDefs, QuestionTypeDefs, EventTypeDefs];
const resolvers = [BaseResolvers, UserResolvers, InvitationResolvers, QuestionResolvers, EventResolvers];

export { typeDefs, resolvers };
