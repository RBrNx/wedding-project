import { gql } from 'apollo-server-lambda';

const coreSchema = gql`
  interface MutationResponse {
    success: Boolean
    message: String
  }

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export default { coreSchema };
