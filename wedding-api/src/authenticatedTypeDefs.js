import { gql } from 'apollo-server-lambda';

const schema = gql`
  extend type Query {
    getAllGuests: [Guest]
    getAllInvitations: [Invitation]
  }
`;

export default schema;
