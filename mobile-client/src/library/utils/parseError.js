const parseError = error => {
  const { message, graphQLErrors, networkError } = error;

  if (graphQLErrors?.length) {
    const { message: errorMessage, extensions } = graphQLErrors[0];
    const { code } = extensions;

    return { message: errorMessage, code };
  }

  if (networkError?.result?.errors?.length && __DEV__) {
    const { message: errorMessage, extensions } = networkError?.result?.errors[0];
    const { code } = extensions;

    return { message: errorMessage, code };
  }

  return { message };
};

export default parseError;
