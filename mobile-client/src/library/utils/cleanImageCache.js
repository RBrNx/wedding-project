import * as FileSystem from 'expo-file-system';

const IMAGE_CACHE_FOLDER = `${FileSystem.cacheDirectory}images/`;
const CACHE_SIZE = 250 * 1000 * 1000; // 250mb
const CHUNK_SIZE = 100;

const cleanImageCache = async () => {
  const cacheDirectory = await FileSystem.getInfoAsync(IMAGE_CACHE_FOLDER);
  let currCacheSize = cacheDirectory.size;
  // create cacheDir if does not exist
  if (!cacheDirectory.exists) {
    await FileSystem.makeDirectoryAsync(IMAGE_CACHE_FOLDER);
  }

  if (currCacheSize > CACHE_SIZE) {
    // cleanup old cached files
    const cachedFiles = await FileSystem.readDirectoryAsync(`${IMAGE_CACHE_FOLDER}`);
    const chunks = Array(Math.ceil(cachedFiles.length / CHUNK_SIZE))
      .fill()
      .map((_, index) => index * CHUNK_SIZE)
      .map(begin => cachedFiles.slice(begin, begin + CHUNK_SIZE));

    const fileInformation = [];
    for (let i = 0; i < chunks.length; i += 1) {
      const chunk = chunks[i];
      // eslint-disable-next-line no-await-in-loop
      const info = await Promise.all(chunk.map(file => FileSystem.getInfoAsync(`${IMAGE_CACHE_FOLDER}${file}`)));
      fileInformation.push(...info);
    }
    fileInformation.sort((a, b) => a.modificationTime - b.modificationTime);

    for (let i = 0; i < fileInformation; i += 1) {
      if (currCacheSize > CACHE_SIZE) {
        FileSystem.deleteAsync(`${IMAGE_CACHE_FOLDER}${fileInformation[i].file}`);
        currCacheSize -= fileInformation[i].size;
      }
    }
  }
};

export default cleanImageCache;
