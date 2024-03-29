import { gql } from 'apollo-server-lambda';

const schema = gql`
  scalar Date

  scalar Time

  scalar LocalTime

  scalar DateTime

  scalar EmailAddress

  scalar PhoneNumber

  scalar URL

  interface MutationResponse {
    success: Boolean
    message: String
  }

  type Query {
    _: Boolean
  }

  type Mutation
`;

export default schema;
