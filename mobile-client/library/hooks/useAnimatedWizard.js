import { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';

const { width } = Dimensions.get('window');

const useAnimatedWizard = duration => {
  const [translateAction, setTranslateAction] = useState(null);
  const [currStepAnimation] = useState(new Animated.Value(0));
  const TranslateAction = Object.freeze({
    NEXT: 'NEXT',
    PREV: 'PREV',
  });
  const outputRanges = {
    [null]: [0, 0, 0, 0],
    [TranslateAction.PREV]: [0, width, -width, 0],
    [TranslateAction.NEXT]: [0, -width, width, 0],
  };
  const animationDuration = duration || 800;

  useEffect(() => {
    if (translateAction !== null) {
      currStepAnimation.setValue(0);
      Animated.timing(currStepAnimation, {
        toValue: 2,
        duration: animationDuration,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.exp),
      }).start(() => setTranslateAction(null));
    }
  }, [animationDuration, currStepAnimation, translateAction]);

  const translateX = currStepAnimation.interpolate({
    inputRange: [0, 1, 1, 2],
    outputRange: outputRanges[translateAction],
    extrapolate: 'clamp',
  });

  const opacity = currStepAnimation.interpolate({
    inputRange: [0, 1, 1, 2],
    outputRange: [1, 0, 0, 1],
    extrapolate: 'clamp',
  });

  return {
    TranslateAction,
    translateAction,
    setTranslateAction,
    animationDuration,
    animatedWizardStyle: { transform: [{ translateX }], opacity },
  };
};

export default useAnimatedWizard;
