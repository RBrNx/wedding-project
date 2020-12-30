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
    email: String
    role: UserRole!
    attending: AttendanceStatus!
  }

  type UserMutationResponse implements MutationResponse {
    success: Boolean
    message: String
    payload: User
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
  }

  input CreateAdminInput {
    firstName: String!
    lastName: String!
    email: EmailAddress!
    password: String!
    eventId: String
  }

  extend type Query {
    getAllGuests: [User]
  }

  extend type Mutation {
    createGuest(guest: CreateUserInput!): UserMutationResponse
    createAdmin(input: CreateAdminInput!): UserMutationResponse
  }
`;

export default schema;