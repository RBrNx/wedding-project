import { useMemo } from 'react';

const useSnapPoints = points => {
  const snapPoints = useMemo(() => points || ['45%', '87.5%'], [points]);

  return snapPoints;
};

export default useSnapPoints;
