import { gql } from 'apollo-server-lambda';

const schema = gql`
  enum QuestionType {
    ATTENDANCE
    MULTIPLE_CHOICE
    TEXT
    SONG_REQUEST
  }

  enum ResponseType {
    INDIVIDUAL
    HOUSEHOLD
  }

  enum QuestionGuestType {
    DAYTIME
    EVENING
    BOTH
  }

  type Choice {
    _id: ID
    label: String
    value: String
  }

  type FollowUp {
    question: Question!
    matchesValue: String!
  }

  type Question {
    _id: ID!
    eventId: ID!
    type: QuestionType!
    title: String!
    label: String
    placeholder: String
    choices: [Choice]
    specificGuests: [User]
    responseType: ResponseType!
    guestType: QuestionGuestType!
    followUpQuestions: [FollowUp]
    order: Int!
    isFollowUp: Boolean!
  }

  type QuestionMutationResponse implements MutationResponse {
    success: Boolean
    message: String
    payload: Question
  }

  input ChoiceInput {
    label: String!
    value: String
  }

  input FollowUpInput {
    question: ID!
    matchesValue: String!
  }

  input CreateQuestionInput {
    type: QuestionType!
    title: String!
    label: String
    choices: [ChoiceInput]
    specificGuests: [ID]
    responseType: ResponseType!
    guestType: QuestionGuestType!
    followUpQuestions: [FollowUpInput!]
    order: Int!
    isFollowUp: Boolean!
  }

  input UpdateQuestionInput {
    type: QuestionType
    title: String
    label: String
    choices: [ChoiceInput]
    specificGuests: [ID]
    responseType: ResponseType
    guestType: QuestionGuestType
    followUpQuestions: [FollowUpInput!]
    order: Int
    isFollowUp: Boolean
  }

  extend type Query {
    getRSVPQuestions: [Question]
  }

  extend type Mutation {
    createQuestion(question: CreateQuestionInput!): QuestionMutationResponse
    updateQuestion(id: ID!, question: UpdateQuestionInput!): QuestionMutationResponse
    deleteQuestion(id: ID!): QuestionMutationResponse
  }
`;

export default schema;
