import RNBlob from 'library/components/RNBlob';

const getBlob = async uri => {
  const res = await fetch(uri);
  const blob = await res.blob();

  // Axios doesn't support Blob in RN correctly, so we use our own wrapper
  // https://github.com/axios/axios/issues/2677
  return new RNBlob([blob]);
};

export { getBlob };
