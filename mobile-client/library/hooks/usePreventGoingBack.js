import { useFocusEffect, useNavigation } from '@react-navigation/core';

const usePreventGoingBack = decisionFunc => {
  const navigation = useNavigation();

  useFocusEffect(() => {
    const preventGoingBack = e => {
      const shouldPreventGoingBack = decisionFunc?.() ?? true;

      if (shouldPreventGoingBack) e.preventDefault();
      else navigation.dispatch(e.data.action);
    };

    navigation.addListener('beforeRemove', preventGoingBack);

    return () => {
      navigation.removeListener('beforeRemove', preventGoingBack);
    };
  });
};

export default usePreventGoingBack;
