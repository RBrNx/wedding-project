import { useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';

const usePreventGoingBack = decisionFunc => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      const shouldPreventGoingBack = decisionFunc?.() ?? true;

      if (shouldPreventGoingBack) e.preventDefault();
      else navigation.dispatch(e.data.action);
    });
  }, [navigation, decisionFunc]);
};

export default usePreventGoingBack;
