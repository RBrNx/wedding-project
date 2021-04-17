import { useEffect } from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const useAnimatedAlert = ({ position, isVisible, isStatusBarTranslucent, breathingSpace, alertHeight = 100 } = {}) => {
  const alertEntrance = useSharedValue(0);
  const { height } = useWindowDimensions();
  const statusBarPadding = isStatusBarTranslucent ? StatusBar.currentHeight : 0;
  const displayHeight = height + statusBarPadding;

  useEffect(() => {
    if (isVisible) alertEntrance.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.exp) });
    else alertEntrance.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.exp) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const animatedAlertStyle = useAnimatedStyle(() => {
    const startY = position === 'bottom' ? displayHeight : 0 - alertHeight;
    const endY =
      position === 'bottom' ? displayHeight - alertHeight - breathingSpace : breathingSpace + statusBarPadding;

    const translateY = interpolate(alertEntrance.value, [0, 1], [startY, endY], Extrapolate.CLAMP);

    return {
      transform: [{ translateY }],
    };
  });

  return {
    animatedAlertStyle,
  };
};

export default useAnimatedAlert;
