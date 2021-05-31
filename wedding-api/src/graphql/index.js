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

const typeDefs = [
  BaseTypeDefs,
  UserTypeDefs,
  InvitationTypeDefs,
  QuestionTypeDefs,
  EventTypeDefs,
  RSVPResponseTypeDefs,
  MusicTypeDefs,
  MemoriesTypeDefs,
];
const resolvers = [
  BaseResolvers,
  UserResolvers,
  InvitationResolvers,
  QuestionResolvers,
  EventResolvers,
  RSVPResponseResolvers,
  MusicResolvers,
  MemoriesResolvers,
];

const unauthenticatedTypeDefs = [BaseTypeDefs, TempLoginTypeDefs];
const unauthenticatedResolvers = [BaseResolvers, TempLoginResolvers];

export { typeDefs, resolvers, unauthenticatedTypeDefs, unauthenticatedResolvers };
