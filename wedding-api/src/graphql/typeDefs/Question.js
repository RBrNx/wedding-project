import { gql } from 'apollo-server-lambda';

const schema = gql`
  enum QuestionType {
    ATTENDANCE
    MULTIPLE_CHOICE
    TEXT
  }

  enum ResponseType {
    INDIVIDUAL
    HOUSEHOLD
  }

  type Choice {
    _id: ID
    label: String
    value: String
  }

  type FollowUp {
    question: Question!
    matchesChoice: ID!
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
    matchesChoice: ID!
  }

  input CreateQuestionInput {
    type: QuestionType!
    title: String!
    label: String
    choices: [ChoiceInput]
    specificGuests: [ID]
    responseType: ResponseType!
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
    followUpQuestions: [FollowUpInput!]
    order: Int!
    isFollowUp: Boolean!
  }

  extend type Query {
    getRSVPQuestions: [Question]
  }

  extend type Mutation {
    createQuestion(question: CreateQuestionInput!): QuestionMutationResponse
    updateQuestion(id: ID!, question: UpdateQuestionInput!): QuestionMutationResponse
  }
`;

export default schema;
