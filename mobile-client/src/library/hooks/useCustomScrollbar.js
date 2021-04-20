import { useState } from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const useCustomScrollbar = scrollY => {
  const [totalScrollbarHeight, setTotalScrollbarHeight] = useState(1);
  const [visibleScrollbarHeight, setVisibleScrollbarHeight] = useState(0);
  const scrollbarOpacity = useSharedValue(0);

  const scrollbarHandleSize =
    totalScrollbarHeight > visibleScrollbarHeight
      ? (visibleScrollbarHeight * visibleScrollbarHeight) / totalScrollbarHeight
      : visibleScrollbarHeight;

  const difference = visibleScrollbarHeight > scrollbarHandleSize ? visibleScrollbarHeight - scrollbarHandleSize : 1;

  const animatedHandleStyle = useAnimatedStyle(() => {
    const value = scrollY.value * (visibleScrollbarHeight / totalScrollbarHeight);
    const translateY = interpolate(value, [0, difference], [0, difference], Extrapolate.CLAMP);

    return {
      transform: [{ translateY }],
    };
  });

  const showScrollbar = () => {
    scrollbarOpacity.value = withTiming(1, { duration: 200 });
  };

  const hideScrollbar = () => {
    scrollbarOpacity.value = withDelay(200, withTiming(0, { duration: 200 }));
  };

  return {
    setTotalScrollbarHeight,
    setVisibleScrollbarHeight,
    scrollbarOpacity,
    scrollbarHandleSize,
    animatedHandleStyle,
    showScrollbar,
    hideScrollbar,
  };
};

export default useCustomScrollbar;
