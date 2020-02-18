import { gql } from 'apollo-server-lambda';

const schema = gql`
  type Guest {
    name: String!,
    email: String!,
    attending: Boolean!,
    mainCourse: String!,
  }

  type Query {
    hello: String!
    getAllGuests: [Guest]
  }
`;

export default schema;
