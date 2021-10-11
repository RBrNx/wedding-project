import { trimObject } from '../../lib/helpers';

const searchTracks = async (parent, { input }, { dataSources }) => {
  try {
    const { searchTerm } = trimObject(input);
    const tracks = await dataSources.spotifyAPI.searchTracks({ searchTerm });

    return tracks;
  } catch (error) {
    console.error('searchTracks', error);
    return error;
  }
};

export default {
  Query: {
    searchTracks,
  },
};
