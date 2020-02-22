import { gql } from 'apollo-server-lambda';

const schema = gql`
  type Guest {
    name: String
    email: String
    attending: Boolean
    mainCourse: String
  }

  type Invitation {
    uniqueCode: String
    guests: [Guest]
  }

  type Query {
    hello: String!
    getAllGuests: [Guest]
    getAllInvitations: [Invitation]
    getInvitation(uniqueCode: String!): Invitation
  }
`;

export default schema;
