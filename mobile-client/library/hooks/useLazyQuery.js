import { useLazyQuery as useLazyQueryApollo } from '@apollo/react-hooks';
import { useEffect, useRef, useCallback } from 'react';

const useLazyQuery = (query, options) => {
  const [execute, result] = useLazyQueryApollo(query, options);

  const resolveRef = useRef();

  useEffect(() => {
    if (result.called && !result.loading && resolveRef.current) {
      resolveRef.current(result);
      resolveRef.current = undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.loading, result.called]);

  const queryLazily = useCallback(
    (variables, context) => {
      execute({ variables, context });

      return new Promise(resolve => {
        resolveRef.current = resolve;
      });
    },
    [execute],
  );

  return [queryLazily, result];
};

export default useLazyQuery;
