import { gql } from 'apollo-server-lambda';

const schema = gql`
  type Answer {
    label: String!
    value: String!
  }

  type RSVPFormTuple {
    question: Question
    answer: Answer
  }

  type SubmitRSVPResponse implements MutationResponse {
    success: Boolean
    message: String
  }

  input AnswerInput {
    label: String!
    value: String!
  }

  input RSVPFormTupleInput {
    question: ID
    answer: AnswerInput
  }

  input SubmitRSVPInput {
    rsvpForm: [RSVPFormTupleInput]!
  }

  extend type Mutation {
    submitRSVPForm(input: SubmitRSVPInput!): SubmitRSVPResponse
  }
`;

export default schema;
