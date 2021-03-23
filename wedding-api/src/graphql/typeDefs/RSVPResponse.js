import { gql } from 'apollo-server-lambda';

const schema = gql`
  type RSVPFormTuple {
    question: Question
    answer: String
  }

  type SubmitRSVPResponse implements MutationResponse {
    success: Boolean
    message: String
  }

  input RSVPFormTupleInput {
    question: ID
    answer: String
  }

  input SubmitRSVPInput {
    rsvpForm: [RSVPFormTupleInput]!
  }

  extend type Mutation {
    submitRSVPForm(input: SubmitRSVPInput!): SubmitRSVPResponse
  }
`;

export default schema;
