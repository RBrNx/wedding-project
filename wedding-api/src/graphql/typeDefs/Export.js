import { gql } from 'apollo-server-lambda';

const schema = gql`
  type ExportMutationResponse implements MutationResponse {
    success: Boolean
    message: String
    payload: String
  }

  extend type Mutation {
    exportInvitationsToCSV: ExportMutationResponse
  }
`;

export default schema;
