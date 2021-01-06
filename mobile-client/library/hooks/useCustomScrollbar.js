import { useState } from 'react';
import { Animated } from 'react-native';

const useCustomScrollbar = scrollY => {
  const [totalScrollbarHeight, setTotalScrollbarHeight] = useState(1);
  const [visibleScrollbarHeight, setVisibleScrollbarHeight] = useState(0);
  const [scrollbarOpacity] = useState(new Animated.Value(0));

  const scrollbarHandleSize =
    totalScrollbarHeight > visibleScrollbarHeight
      ? (visibleScrollbarHeight * visibleScrollbarHeight) / totalScrollbarHeight
      : visibleScrollbarHeight;

  const difference = visibleScrollbarHeight > scrollbarHandleSize ? visibleScrollbarHeight - scrollbarHandleSize : 1;

  const scrollbarHandlePosition = Animated.multiply(scrollY, visibleScrollbarHeight / totalScrollbarHeight).interpolate(
    {
      inputRange: [0, difference],
      outputRange: [0, difference],
      extrapolate: 'clamp',
    },
  );

  const showScrollbar = () => {
    Animated.timing(scrollbarOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideScrollbar = () => {
    Animated.timing(scrollbarOpacity, {
      toValue: 0,
      delay: 200,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return {
    setTotalScrollbarHeight,
    setVisibleScrollbarHeight,
    scrollbarOpacity,
    scrollbarHandleSize,
    scrollbarHandlePosition,
    showScrollbar,
    hideScrollbar,
  };
};

export default useCustomScrollbar;
