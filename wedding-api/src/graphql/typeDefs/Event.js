import { gql } from 'apollo-server-lambda';

const schema = gql`
  type Event {
    _id: ID!
    name: String!
    date: Date!
  }

  type CreateEventResponse implements MutationResponse {
    success: Boolean!
    message: String
    payload: Event
  }

  input CreateEventInput {
    name: String!
    date: Date!
  }

  extend type Mutation {
    createEvent(input: CreateEventInput!): CreateEventResponse
  }
`;

export default schema;
