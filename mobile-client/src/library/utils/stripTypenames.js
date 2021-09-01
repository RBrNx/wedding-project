const stripTypenames = value => {
  if (Array.isArray(value)) {
    return value.map(stripTypenames);
  }

  if (value !== null && typeof value === 'object') {
    const newObject = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const property in value) {
      if (property !== '__typename') {
        newObject[property] = stripTypenames(value[property]);
      }
    }
    return newObject;
  }

  return value;
};

export { stripTypenames };
