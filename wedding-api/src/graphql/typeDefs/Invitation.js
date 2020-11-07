import { gql } from 'apollo-server-lambda';

const schema = gql`
  enum InvitationType {
    DAYTIME
    EVENING
  }

  type Invitation {
    _id: ID
    uniqueCode: String
    guests: [Guest]
    type: InvitationType
  }

  extend type Query {
    getInvitation(uniqueCode: String!): Invitation
    getAllInvitations: [Invitation]
  }
`;

export default schema;
