import { gql } from 'apollo-server-lambda';

const schema = gql`
  enum AttendanceStatus {
    AWAITING_RSVP
    ATTENDING
    NOT_ATTENDING
  }

  enum UserRole {
    GUEST
    ADMIN
  }

  type User {
    _id: ID!
    eventId: ID!
    firstName: String!
    lastName: String!
    email: EmailAddress
    role: UserRole!
    attendanceStatus: AttendanceStatus!
    rsvpForm: [RSVPFormTuple!]
    invitationId: String!
    invitationType: InvitationType!
  }

  type UserMutationResponse implements MutationResponse {
    success: Boolean
    message: String
    payload: User
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    invitationType: InvitationType!
  }

  input CreateAdminInput {
    firstName: String!
    lastName: String!
    email: EmailAddress!
    password: String!
    eventId: String
  }

  input GetAllGuestsInput {
    searchTerm: String
  }

  extend type Query {
    getAllGuests(input: GetAllGuestsInput): [User]
    getCurrentUser: User
  }

  extend type Mutation {
    createGuest(guest: CreateUserInput!): UserMutationResponse
    createAdmin(input: CreateAdminInput!): UserMutationResponse
    deleteGuest(id: ID!): UserMutationResponse
  }
`;

export default schema;
