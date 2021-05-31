const CONTENT_TYPE_SUFFIX_MAPPINGS = {
  'image/jpeg': 'jpg',
  'image/svg+xml': 'svg',
  'image/png': 'png',
};

const getSupportedContentTypes = () => {
  return Object.keys(CONTENT_TYPE_SUFFIX_MAPPINGS);
};

const isValidImageContentType = contentType => {
  return Object.keys(CONTENT_TYPE_SUFFIX_MAPPINGS).includes(contentType);
};

const getFileSuffixForContentType = contentType => {
  return CONTENT_TYPE_SUFFIX_MAPPINGS[contentType];
};

export { getSupportedContentTypes, isValidImageContentType, getFileSuffixForContentType };
