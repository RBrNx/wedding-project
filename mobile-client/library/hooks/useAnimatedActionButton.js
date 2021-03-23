import { useEffect, useState } from 'react';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const useAnimatedActionButton = ({ size, maxExpansionWidth, animationDuration, expandToFullSize } = {}) => {
  const expansion = useSharedValue(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useDerivedValue(() => {
    if (expansion.value > 0.5 && !isExpanded) runOnJS(setIsExpanded)(true);
    else if (expansion.value <= 0.5 && isExpanded) runOnJS(setIsExpanded)(false);
  }, [isExpanded]);

  useEffect(() => {
    if (expandToFullSize) expandActionButton();
    else shrinkActionButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandToFullSize]);

  const shrinkActionButton = () => {
    expansion.value = withTiming(0, { duration: animationDuration });
  };

  const expandActionButton = () => {
    expansion.value = withTiming(1, { duration: animationDuration });
  };

  const animatedExpansionStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(expansion.value, [0, 1], [size, maxExpansionWidth], Extrapolate.CLAMP),
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(expansion.value, [0, 0.45], [1, 0], Extrapolate.CLAMP);

    return {
      opacity,
    };
  });

  const animatedMessageStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(expansion.value, [0, 0.45, 1], [0, 0, maxExpansionWidth], Extrapolate.CLAMP),
      opacity: interpolate(expansion.value, [0, 0.65, 1], [0, 0, 1], Extrapolate.CLAMP),
    };
  });

  return {
    expansion,
    shrinkActionButton,
    expandActionButton,
    animatedExpansionStyle,
    animatedIconStyle,
    animatedMessageStyle,
    isExpanded,
  };
};

export default useAnimatedActionButton;
