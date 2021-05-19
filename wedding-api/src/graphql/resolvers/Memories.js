const getMemories = async (parent, { filter }, { dataSources }) => {
  try {
    const res = await dataSources.picsumAPI.listImages(filter);

    return res;
  } catch (error) {
    return error;
  }
};

const getMemoryAlbums = async (parent, { filter }, { dataSources }) => {
  try {
    const res = await dataSources.picsumAPI.listImagesAsAlbums(filter);

    return res;
  } catch (error) {
    return error;
  }
};

export default {
  Memory: {
    __resolveType(obj) {
      if (obj.url) {
        return 'ImageMemory';
      }
      if (obj.title) {
        return 'TextMemory';
      }
      return null; // GraphQLError is thrown
    },
  },
  Query: {
    getMemories,
    getMemoryAlbums,
  },
};
