import { gql } from 'apollo-server-lambda';

const schema = gql`
  scalar Date

  scalar Time

  scalar DateTime

  scalar EmailAddress

  scalar URL

  interface MutationResponse {
    success: Boolean
    message: String
  }

  type Query

  type Mutation
`;

export default schema;
