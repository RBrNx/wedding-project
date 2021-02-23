import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const useAnimatedWizardV2 = ({ currStep }) => {
  const stepDirection = useSharedValue(0);

  useEffect(() => {
    stepDirection.value = 0;
  }, [currStep]);

  const moveToPrevStep = callback => {
    stepDirection.value = withTiming(-1, { duration: 300 }, isFinished => {
      if (callback) runOnJS(callback)(isFinished);
    });
  };

  const moveToNextStep = callback => {
    stepDirection.value = withTiming(1, { duration: 300 }, isFinished => {
      if (callback) runOnJS(callback)(isFinished);
    });
  };

  const prevStepAnimatedStyle = useAnimatedStyle(() => {
    const outputRange = [0, -width, -width];
    const translateX = interpolate(stepDirection.value, [-1, 0, 1], outputRange, Extrapolate.CLAMP);

    return {
      transform: [{ translateX }],
    };
  });

  const currStepAnimatedStyle = useAnimatedStyle(() => {
    const outputRange = [width, 0, -width];
    const translateX = interpolate(stepDirection.value, [-1, 0, 1], outputRange, Extrapolate.CLAMP);

    return {
      transform: [{ translateX }],
    };
  });

  const nextStepAnimatedStyle = useAnimatedStyle(() => {
    const outputRange = [width, width, 0];
    const translateX = interpolate(stepDirection.value, [-1, 0, 1], outputRange, Extrapolate.CLAMP);

    return {
      transform: [{ translateX }],
    };
  });

  return {
    moveToPrevStep,
    moveToNextStep,
    prevStepAnimatedStyle,
    currStepAnimatedStyle,
    nextStepAnimatedStyle,
    stepDirection,
  };
};

export default useAnimatedWizardV2;
