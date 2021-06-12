const extensionMap = Object.freeze({
  jpg: 'image/jpeg',
  svg: 'image/svg+xml',
  png: 'image/png',
});

const extensionToMimeType = ext => {
  return extensionMap[ext];
};

export { extensionToMimeType };
