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
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    role: UserRole
    attending: AttendanceStatus
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

  extend type Query {
    getAllGuests: [User]
  }

  extend type Mutation {
    createGuest(guest: CreateUserInput!): UserMutationResponse
  }
`;

export default schema;
