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

  type InvitationGroupMutationResponse implements MutationResponse {
    success: Boolean
    message: String
    payload: InvitationGroup
  }

  input CreateInvitationGroupInput {
    type: InvitationType!
    guests: [CreateUserInput!]
  }

  extend type Query {
    getInvitationGroup(id: ID!): InvitationGroup
    getAllInvitationGroups: [InvitationGroup]
  }

  extend type Mutation {
    createInvitationGroup(invitationGroup: CreateInvitationGroupInput!): InvitationGroupMutationResponse
    deleteInvitationGroup(id: ID!): InvitationGroupMutationResponse
  }
`;

export default schema;
