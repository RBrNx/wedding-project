import { useLazyQuery as useLazyQueryApollo } from '@apollo/react-hooks';
import { useEffect, useRef, useCallback, useState } from 'react';

const useLazyQuery = (query, options) => {
  const [awaitingResult, setAwaitingResult] = useState(false);
  const [execute, result] = useLazyQueryApollo(query, options);

  const resolveRef = useRef();

  useEffect(() => {
    if (result.called && !result.loading && resolveRef.current && awaitingResult) {
      resolveRef.current(result);
      resolveRef.current = undefined;
      setAwaitingResult(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.loading, result.called, awaitingResult]);

  const queryLazily = useCallback(
    (variables, context) => {
      setAwaitingResult(true);
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
