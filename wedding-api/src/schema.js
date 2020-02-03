import { gql } from 'apollo-server-lambda';

const schema = gql`
  type Query {
    hello: String!
    getAllGuests: [String!]
  }
`;

export default schema;
