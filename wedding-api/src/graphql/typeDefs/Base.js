import { gql } from 'apollo-server-lambda';

const schema = gql`
  interface MutationResponse {
    success: Boolean
    message: String
  }

  type Query

  type Mutation
`;

export default schema;
