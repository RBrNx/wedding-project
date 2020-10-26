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

  enum QuestionType {
    ATTENDANCE
    MULTIPLE_CHOICE
    TEXT
  }

  enum ResponseType {
    INDIVIDUAL
    HOUSEHOLD
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

  type Choice {
    _id: ID
    text: String
  }

  type FollowUp {
    to: ID
    matchesChoice: ID
  }

  type Question {
    _id: ID
    type: QuestionType
    title: String
    label: String
    choices: [Choice]
    specificGuests: [Guest]
    responseType: ResponseType
    followUp: FollowUp
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
