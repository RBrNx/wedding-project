import * as FileSystem from 'expo-file-system';

const IMAGE_CACHE_FOLDER = `${FileSystem.cacheDirectory}images/`;

const cleanImageCache = async () => {
  const cacheDirectory = await FileSystem.getInfoAsync(IMAGE_CACHE_FOLDER);
  // create cacheDir if does not exist
  if (!cacheDirectory.exists) {
    await FileSystem.makeDirectoryAsync(IMAGE_CACHE_FOLDER);
  }

  // cleanup old cached files
  const cachedFiles = await FileSystem.readDirectoryAsync(`${IMAGE_CACHE_FOLDER}`);

  // cleanup cache, leave only up to 1 Gb most recent files
  const sorted = (
    await Promise.all(
      cachedFiles.map(async file => {
        // the the file metadata, so that we can use it to sort the list of files
        const info = await FileSystem.getInfoAsync(`${IMAGE_CACHE_FOLDER}${file}`);
        return Promise.resolve({ file, modificationTime: info.modificationTime, size: info.size });
      }),
    )
  )
    // sort the files in the list by time
    .sort((a, b) => a.modificationTime - b.modificationTime);

  // let's calculate the total size of files in cache
  let sumSize = sorted.reduce((accumulator, currentValue) => accumulator + Number(currentValue.size), 0);

  // second pass to clean up the cached files
  for (let i = 0; i < sorted.length; i += 1) {
    if (sumSize > 1000 * 1000 * 1000) {
      // 1 GB
      FileSystem.deleteAsync(`${IMAGE_CACHE_FOLDER}${sorted[i].file}`, { idempotent: true });
      sumSize -= sorted[i].size;
    }
  }
};

export default cleanImageCache;
