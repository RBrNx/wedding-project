// Resolvers
import BaseResolvers from './resolvers/Base';
import UserResolvers from './resolvers/User';
import InvitationResolvers from './resolvers/InvitationGroup';
import QuestionResolvers from './resolvers/Question';
import TempLoginResolvers from './resolvers/TempLogin';
import EventResolvers from './resolvers/Event';
import RSVPResponseResolvers from './resolvers/RSVPResponse';
import MusicResolvers from './resolvers/Music';
import MemoriesResolvers from './resolvers/Memories';
import ExportResolvers from './resolvers/Export';

// TypeDefs
import BaseTypeDefs from './typeDefs/Base';
import UserTypeDefs from './typeDefs/User';
import InvitationTypeDefs from './typeDefs/InvitationGroup';
import QuestionTypeDefs from './typeDefs/Question';
import TempLoginTypeDefs from './typeDefs/TempLogin';
import EventTypeDefs from './typeDefs/Event';
import RSVPResponseTypeDefs from './typeDefs/RSVPResponse';
import MusicTypeDefs from './typeDefs/Music';
import MemoriesTypeDefs from './typeDefs/Memories';
import ExportTypeDefs from './typeDefs/Export';

const typeDefs = [
  BaseTypeDefs,
  EventTypeDefs.AuthenticatedSchema,
  UserTypeDefs,
  InvitationTypeDefs,
  QuestionTypeDefs,
  RSVPResponseTypeDefs,
  MusicTypeDefs,
  MemoriesTypeDefs,
  ExportTypeDefs,
];
const resolvers = [
  BaseResolvers,
  EventResolvers.authenticated,
  UserResolvers,
  InvitationResolvers,
  QuestionResolvers,
  RSVPResponseResolvers,
  MusicResolvers,
  MemoriesResolvers,
  ExportResolvers,
];

const unauthenticatedTypeDefs = [BaseTypeDefs, EventTypeDefs.UnauthenticatedSchema, TempLoginTypeDefs];
const unauthenticatedResolvers = [BaseResolvers, EventResolvers.unauthenticated, TempLoginResolvers];

export { typeDefs, resolvers, unauthenticatedTypeDefs, unauthenticatedResolvers };
