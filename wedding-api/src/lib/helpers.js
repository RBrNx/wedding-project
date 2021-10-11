const mapEnumValues = enumObj => {
  return Object.keys(enumObj).map(key => key);
};

const stripNonAlphaChars = string => {
  // Strip Apostrophies, Spaces and Hypenss
  return string.replace(/\s+/g, '').replace(/'+/g, '').replace(/-+/g, '');
};

const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const trimObject = obj => {
  if (!obj) return null;

  if (!Array.isArray(obj) && typeof obj !== 'object') return obj;

  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[key.trim()] = typeof obj[key] === 'string' ? obj[key].trim() : trimObject(obj[key]);
      return acc;
    },
    Array.isArray(obj) ? [] : {},
  );
};

export { mapEnumValues, stripNonAlphaChars, escapeRegExp, trimObject };
