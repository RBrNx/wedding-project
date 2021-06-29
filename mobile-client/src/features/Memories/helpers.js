const getBlob = async uri => {
  const res = await fetch(uri);
  const blob = await res.blob();

  return blob;
};

export { getBlob };
