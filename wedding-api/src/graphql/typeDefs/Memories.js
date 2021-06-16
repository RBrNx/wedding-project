import { gql } from 'apollo-server-lambda';

const schema = gql`
  type TextMemory {
    id: ID
  }

  type ImageMemory {
    _id: ID!
    albumId: String!
    photoId: String!
    eventId: ID!
    sortIndex: Int
    caption: String
    url: URL!
    thumbnail: URL!
    createdAt: DateTime!
    updatedAt: DateTime!
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
