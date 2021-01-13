import { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';

const { width } = Dimensions.get('window');

const useAnimatedWizard = duration => {
  const [translateAction, setTranslateAction] = useState(null);
  const [currStepAnimation] = useState(new Animated.Value(0));
  const [nextStepAnimation] = useState(new Animated.Value(0));
  const TranslateAction = Object.freeze({
    OUT_LEFT: 'OUT_LEFT',
    OUT_RIGHT: 'OUT_RIGHT',
    IN_LEFT: 'IN_LEFT',
    IN_RIGHT: 'IN_RIGHT',
  });
  const translateOutputRanges = {
    [TranslateAction.IN_LEFT]: [-width, 0],
    [TranslateAction.IN_RIGHT]: [width, 0],
    [TranslateAction.OUT_LEFT]: [0, -width],
    [TranslateAction.OUT_RIGHT]: [0, width],
  };
  const animationDuration = duration || 400;

  useEffect(() => {
    if (translateAction === TranslateAction.OUT_LEFT) {
      Animated.timing(currStepAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.in(Easing.exp),
      }).start(() => {
        setTranslateAction(TranslateAction.IN_RIGHT);
      });
    }

    if (translateAction === TranslateAction.OUT_RIGHT) {
      Animated.timing(currStepAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.in(Easing.exp),
      }).start(() => {
        setTranslateAction(TranslateAction.IN_LEFT);
      });
    }

    if (translateAction === TranslateAction.IN_LEFT) {
      Animated.timing(nextStepAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }).start();
    }

    if (translateAction === TranslateAction.IN_RIGHT) {
      Animated.timing(nextStepAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }).start();
    }
  }, [
    TranslateAction.IN_LEFT,
    TranslateAction.IN_RIGHT,
    TranslateAction.OUT_LEFT,
    TranslateAction.OUT_RIGHT,
    currStepAnimation,
    nextStepAnimation,
    translateAction,
  ]);

  const translateOut = currStepAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: translateOutputRanges[translateAction] || [0, 0],
    extrapolate: 'clamp',
  });

  const translateIn = nextStepAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: translateOutputRanges[translateAction] || [0, 0],
    extrapolate: 'clamp',
  });

  const opacityOut = currStepAnimation.interpolate({
    inputRange: [0, 0.75],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const opacityIn = nextStepAnimation.interpolate({
    inputRange: [0, 0.75],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return {
    TranslateAction,
    translateOut,
    translateIn,
    opacityOut,
    opacityIn,
    translateAction,
    setTranslateAction,
    animationDuration,
  };
};

export default useAnimatedWizard;
