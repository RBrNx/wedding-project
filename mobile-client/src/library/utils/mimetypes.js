const extensionMap = Object.freeze({
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
  png: 'image/png',
  heic: 'image/heic',
  heif: 'image/heif',
});

const extensionToMimeType = ext => {
  return extensionMap[ext.toLowerCase()];
};

export { extensionToMimeType };
