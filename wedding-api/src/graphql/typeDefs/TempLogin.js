import { gql } from 'apollo-server-lambda';

const schema = gql`
  type TempLoginCredentials {
    username: String!
    password: String!
  }

  type TempLoginResponse implements MutationResponse {
    success: Boolean!
    message: String
    payload: TempLoginCredentials
  }

  input FetchCredentialsInput {
    shortId: String!
  }

  extend type Mutation {
    fetchTempLoginCredentials(input: FetchCredentialsInput!): TempLoginResponse
  }
`;

export default schema;
