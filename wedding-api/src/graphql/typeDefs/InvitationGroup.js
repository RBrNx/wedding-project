import { gql } from 'apollo-server-lambda';

const schema = gql`
  enum InvitationType {
    DAYTIME
    EVENING
  }

  type InvitationGroup {
    _id: ID!
    guests: [User]
    type: InvitationType!
    invitationCode: String!
  }
  }

  extend type Query {
    getInvitationGroup(id: ID!): InvitationGroup
    getAllInvitationGroups: [InvitationGroup]
  }
`;

export default schema;
