import { gql } from 'apollo-server-lambda';

const schema = gql`
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

  extend type Query {
    getAllGuests: [Guest]
    getAllInvitations: [Invitation]
  }

  extend type Mutation {
    createQuestion(question: QuestionInput!): UpdateResponse
  }
`;

export default schema;
