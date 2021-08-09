import { gql } from 'apollo-server-lambda';

const UnauthenticatedSchema = gql`
  type Event {
    _id: ID!
    name: String!
    date: Date!
  }

  type User {
    _id: ID!
    eventId: ID!
    firstName: String!
    lastName: String!
    email: EmailAddress
  }

  type CreateEventPayload {
    event: Event!
    admin: User!
  }

  type CreateEventResponse implements MutationResponse {
    success: Boolean!
    message: String
    payload: CreateEventPayload
  }

  input CreateAdminInput {
    firstName: String!
    lastName: String!
    email: EmailAddress!
    password: String!
    eventId: String
  }

  input CreateEventInput {
    name: String!
    date: Date!
    admin: CreateAdminInput!
  }

  extend type Mutation {
    createEvent(input: CreateEventInput!): CreateEventResponse
  }
`;

const AuthenticatedSchema = gql`
  type Event {
    _id: ID!
    name: String!
    date: Date!
  }

  extend type Query {
    getEventInfo: Event
  }
`;

export default { UnauthenticatedSchema, AuthenticatedSchema };
