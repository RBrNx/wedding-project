const listNames = names => {
  if (!names?.length) return null;
  if (names.length === 1) return names[0];

  const [finalName, ...rest] = names.reverse();
  return `${rest.join(', ')} & ${finalName}`;
};

export { listNames };
