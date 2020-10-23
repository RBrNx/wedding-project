import { gql } from 'apollo-server-lambda';

const schema = gql`
  enum GuestResponse {
    AWAITING_RSVP
    ATTENDING
    NOT_ATTENDING
  }

  enum InvitationType {
    DAYTIME
    EVENING
  }

  type Guest {
    _id: ID
    firstName: String
    lastName: String
    email: String
    attending: GuestResponse
    mainCourse: String
  }

  type Invitation {
    _id: ID
    uniqueCode: String
    guests: [Guest]
    type: InvitationType
  }

  input GuestInput {
    guestId: ID!
    attending: GuestResponse!
    mainCourse: String
    email: String
  }

  type UpdateResponse {
    success: Boolean
    feedback: String
  }

  type Query {
    getInvitation(uniqueCode: String!): Invitation
  }

  type Mutation {
    updateGuest(input: GuestInput!): UpdateResponse
  }
`;

export default schema;
