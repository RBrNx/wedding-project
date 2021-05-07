import { gql } from 'apollo-server-lambda';

const schema = gql`
  type Track {
    id: String!
    href: URL!
    uri: String!
    name: String!
    artists: [String!]!
    albumArt: URL!
    album: String!
  }

  type TrackList {
    items: [Track]!
    limit: Int!
    offset: Int!
    next: URL!
    previous: URL!
    total: Int!
  }

  input SearchTrackInput {
    searchTerm: String!
  }

  extend type Query {
    searchTracks(input: SearchTrackInput): TrackList
  }
`;

export default schema;
