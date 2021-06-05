import AWS from 'aws-sdk';

const { KEY_PAIR_ID, CLOUDFRONT_SIGNER_PRIVATE_KEY } = process.env;
const signer = new AWS.CloudFront.Signer(KEY_PAIR_ID, CLOUDFRONT_SIGNER_PRIVATE_KEY);

const getMemories = async (parent, args, { currentUser, db }) => {
  try {
    const MemoryModel = db.model('Memory');

    const memories = await MemoryModel.find({ eventId: currentUser.eventId }).lean();

    const expires = new Date(new Date().getTime() + 1000 * 10).getTime();
    return memories.map(memory => {
      const signedUrl = signer.getSignedUrl({ url: memory.url, expires });

      return { ...memory, url: signedUrl };
    });
  } catch (error) {
    return error;
  }
};

const getMemoryAlbums = async (parent, args, { currentUser, db }) => {
  try {
    const MemoryModel = db.model('Memory');

    const memories = await MemoryModel.find({ eventId: currentUser.eventId }).lean();

    const expires = new Date(new Date().getTime() + 1000 * 10).getTime();
    const albumGroups = memories.reduce((albums, memory) => {
      const signedUrl = signer.getSignedUrl({ url: memory.url, expires });
      const signedThumbnail = signer.getSignedUrl({ url: memory.thumbnail, expires });

      return {
        ...albums,
        [memory.albumId]: [
          ...(albums[memory.albumId] || []),
          { ...memory, url: signedUrl, thumbnail: signedThumbnail },
        ],
      };
    }, {});
    const albums = Object.entries(albumGroups).map(([_albumId, album]) => ({ images: album }));

    return albums;
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
