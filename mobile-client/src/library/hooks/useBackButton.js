import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackButton = decisionFunc => {
  useEffect(() => {
    const checkBackButtonEvent = () => {
      const disableBackButton = decisionFunc?.() ?? false;

      return disableBackButton;
    };

    BackHandler.addEventListener('hardwareBackPress', checkBackButtonEvent);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', checkBackButtonEvent);
    };
  });
};

export default useBackButton;
