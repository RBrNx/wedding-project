import { gql } from 'apollo-server-lambda';

const schema = gql`
  type Query {
    getAllGuests: [Guest]
    getAllInvitations: [Invitation]
  }
`;

export default schema;
