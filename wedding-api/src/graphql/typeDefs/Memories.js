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

  type Album {
    images: [Memory]
  }

  union Memory = ImageMemory | TextMemory

  input MemoryFilterInput {
    page: Int!
    limit: Int!
  }

  extend type Query {
    getMemories(filter: MemoryFilterInput!): [Memory]
    getMemoryAlbums(filter: MemoryFilterInput!): [Album]
  }
`;

export default schema;
