import { gql } from 'apollo-server-lambda';

const schema = gql`
  type TextMemory {
    id: ID
  }

  type ImageMemory {
    id: ID!
    author: String!
    width: Int!
    height: Int!
    url: URL!
    downloadUrl: URL!
  }

  union Memory = ImageMemory | TextMemory

  input MemoryFilterInput {
    page: Int!
    limit: Int!
  }

  extend type Query {
    getMemories(filter: MemoryFilterInput!): [Memory]
  }
`;

export default schema;
