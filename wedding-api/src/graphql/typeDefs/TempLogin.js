import { gql } from 'apollo-server-lambda';

const schema = gql`
  type TempLoginCredentials {
    user: User!
    username: String!
    password: String!
  }

  type TempLoginResponse implements MutationResponse {
    success: Boolean!
    message: String
    payload: [TempLoginCredentials]
  }

  input FetchCredentialsInput {
    invitationCode: String!
  }

  extend type Mutation {
    fetchTempLoginCredentials(input: FetchCredentialsInput!): TempLoginResponse
  }
`;

export default schema;
