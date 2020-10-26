import { gql } from 'apollo-server-lambda';

const coreSchema = gql`
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
  }
`;

const authenticatedSchema = gql`
  extend type Query {
    getAllInvitations: [Invitation]
  }
`;

export default { coreSchema, authenticatedSchema };
