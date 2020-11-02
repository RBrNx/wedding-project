import { gql } from 'apollo-server-lambda';

const coreSchema = gql`
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

  type AnswerMutationResponse implements MutationResponse {
    success: Boolean
    message: String
  }

  input TextAnswerInput {
    questionId: ID!
    answer: String!
  }

  extend type Mutation {
    answerTextQuestion(guestId: ID!, answerInput: TextAnswerInput!): AnswerMutationResponse
  }
`;

const authenticatedSchema = gql`
  type QuestionMutationResponse implements MutationResponse {
    success: Boolean
    message: String
    payload: Question
  }

  input ChoiceInput {
    text: String!
  }

  input FollowUpInput {
    to: ID!
    matchesChoice: ID!
  }

  input QuestionInput {
    type: QuestionType!
    title: String!
    label: String
    choices: [ChoiceInput]
    specificGuests: [ID]
    responseType: ResponseType!
    followUp: FollowUpInput
  }

  extend type Mutation {
    createQuestion(question: QuestionInput!): QuestionMutationResponse
  }
`;

export default { coreSchema, authenticatedSchema };
