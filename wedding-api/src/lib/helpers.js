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

export { mapEnumValues, stripNonAlphaChars, escapeRegExp };
