import { gql } from 'apollo-server-lambda';

const coreSchema = gql`
  enum GuestResponse {
    AWAITING_RSVP
    ATTENDING
    NOT_ATTENDING
  }

  type Guest {
    _id: ID
    firstName: String
    lastName: String
    email: String
    attending: GuestResponse
    mainCourse: String
  }
`;

const authenticatedSchema = gql`
  type GuestMutationResponse implements MutationResponse {
    success: Boolean
    message: String
    payload: Guest
  }

  input GuestInput {
    guestId: ID!
    attending: GuestResponse!
    mainCourse: String
    email: String
  }

  extend type Query {
    getAllGuests: [Guest]
  }

  extend type Mutation {
    updateGuest(guest: GuestInput!): GuestMutationResponse
  }
`;

export default { coreSchema, authenticatedSchema };
