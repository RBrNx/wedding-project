import { useState } from 'react';
import { Dimensions } from 'react-native';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const useAnimatedWizard = ({ duration = 400 } = {}) => {
  const stepAnimation = useSharedValue(0);
  const [transformOutput, setTransformOutput] = useState([0, 0, 0, 0]);

  const animateStepChange = ({ fromStep, toStep, callback = () => {} }) => {
    if (toStep > fromStep) setTransformOutput([0, -width, width, 0]);
    else if (toStep < fromStep) setTransformOutput([0, width, -width, 0]);

    stepAnimation.value = 0;
    const animateScreenOut = withTiming(1, { duration, easing: Easing.inOut(Easing.exp) }, () => runOnJS(callback)());
    const animateScreenIn = withTiming(2, { duration, easing: Easing.inOut(Easing.exp) });

    stepAnimation.value = withSequence(animateScreenOut, animateScreenIn);
  };

  const animatedWizardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: interpolate(stepAnimation.value, [0, 1, 1, 2], transformOutput, Extrapolate.CLAMP) }],
      opacity: interpolate(stepAnimation.value, [0, 1, 1, 2], [1, 0, 0, 1], Extrapolate.CLAMP),
    };
  });

  return {
    animateStepChange,
    animatedWizardStyle,
  };
};

export default useAnimatedWizard;
