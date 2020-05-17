import { gql } from 'apollo-server-lambda';

const schema = gql`
  enum GuestResponseEnum {
    AWAITING_RSVP
    ATTENDING
    NOT_ATTENDING
  }

  enum InvitationTypeEnum {
    DAYTIME
    EVENING
  }

  type Guest {
    _id: ID
    firstName: String
    lastName: String
    email: String
    attending: GuestResponseEnum
    mainCourse: String
  }

  type Invitation {
    _id: ID
    uniqueCode: String
    guests: [Guest]
    type: InvitationTypeEnum
  }

  input GuestInput {
    guestId: ID!
    attending: GuestResponseEnum!
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
