import { useState } from 'react';
import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';

const useAnimatedStepTransition = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const animIndex = useSharedValue(0);

  const moveToPrevStep = callback => {
    const currAnimValue = animIndex.value;

    const isAnimating = !Number.isInteger(currAnimValue);
    const prevIndexValue = isAnimating ? Math.floor(currAnimValue) : currAnimValue - 1;

    animIndex.value = withTiming(prevIndexValue, { duration: 300 }, isFinished => {
      if (isFinished) {
        runOnJS(setCurrIndex)(currIndex - 1);
        if (callback) runOnJS(callback)();
      }
    });
  };

  const moveToNextStep = callback => {
    const currAnimValue = animIndex.value;

    const isAnimating = !Number.isInteger(currAnimValue);
    const nextIndexValue = isAnimating ? Math.ceil(currAnimValue) : currAnimValue + 1;

    animIndex.value = withTiming(nextIndexValue, { duration: 300 }, isFinished => {
      if (isFinished) {
        runOnJS(setCurrIndex)(currIndex + 1);
        if (callback) runOnJS(callback)();
      }
    });
  };

  return {
    currIndex,
    animIndex,
    moveToPrevStep,
    moveToNextStep,
  };
};

export default useAnimatedStepTransition;
