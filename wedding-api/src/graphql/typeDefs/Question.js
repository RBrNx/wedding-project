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
    question: ID!
    matchesChoice: ID!
  }

  type Question {
    _id: ID!
    eventId: ID!
    type: QuestionType!
    title: String!
    label: String
    choices: [Choice]
    specificGuests: [User]
    responseType: ResponseType!
    followUpQuestions: [FollowUp]
    order: Int!
    isFollowUp: Boolean!
  }

  type AnswerMutationResponse implements MutationResponse {
    success: Boolean
    message: String
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
    order: Int!
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

  input TextAnswerInput {
    questionId: ID!
    answer: String!
  }

  input ChoiceAnswerInput {
    questionId: ID!
    answer: ID!
  }

  extend type Query {
    getRSVPQuestions: [Question]
  }

  extend type Mutation {
    createQuestion(question: CreateQuestionInput!): QuestionMutationResponse
    updateQuestion(id: ID!, question: UpdateQuestionInput!): QuestionMutationResponse
    answerTextQuestion(guestId: ID!, answerInput: TextAnswerInput!): AnswerMutationResponse
    answerChoiceQuestion(guestId: ID!, answerInput: ChoiceAnswerInput!): AnswerMutationResponse
  }
`;

export default schema;
