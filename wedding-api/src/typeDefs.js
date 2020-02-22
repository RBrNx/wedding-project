import { gql } from 'apollo-server-lambda';

const schema = gql`
  type Guest {
    _id: ID
    name: String
    email: String
    attending: Boolean
    mainCourse: String
  }

  type Invitation {
    uniqueCode: String
    guests: [Guest]
  }

  input GuestInput {
    guestId: ID!,
    attending: Boolean!
    mainCourse: String
    email: String
  }

  type UpdateResponse {
    success: Boolean
    feedback: String
  }

  type Query {
    hello: String!
    getAllGuests: [Guest]
    getAllInvitations: [Invitation]
    getInvitation(uniqueCode: String!): Invitation
  }

  type Mutation {
    updateGuest(input: GuestInput!): UpdateResponse
  }
`;

export default schema;
