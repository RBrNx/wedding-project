import { useState } from 'react';
import { Easing, runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';

const useAnimatedStepTransition = ({ duration = 300, easing = Easing.linear } = {}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const animIndex = useSharedValue(0);

  const moveToPrevStep = callback => {
    const currAnimValue = animIndex.value;

    const isAnimating = !Number.isInteger(currAnimValue);
    const prevIndexValue = isAnimating ? Math.floor(currAnimValue) : currAnimValue - 1;

    animIndex.value = withTiming(prevIndexValue, { duration, easing }, isFinished => {
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

    animIndex.value = withTiming(nextIndexValue, { duration, easing }, isFinished => {
      if (isFinished) {
        runOnJS(setCurrIndex)(currIndex + 1);
        if (callback) runOnJS(callback)();
      }
    });
  };

  const moveToStep = (stepIndex, callback) => {
    const currAnimValue = animIndex.value;
    const isAnimating = !Number.isInteger(currAnimValue);

    if (isAnimating) return;

    animIndex.value = withTiming(stepIndex, { duration, easing }, isFinished => {
      if (isFinished) {
        runOnJS(setCurrIndex)(stepIndex);
        if (callback) runOnJS(callback)();
      }
    });
  };

  return {
    currIndex,
    animIndex,
    moveToPrevStep,
    moveToNextStep,
    moveToStep,
  };
};

export default useAnimatedStepTransition;
