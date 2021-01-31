import { useTheme } from '@react-navigation/native';
import Color from 'color';
import { useState } from 'react';
import {
  Easing,
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const useAnimatedActionButton = ({ size, maxExpansionWidth, isPressed, animationDuration } = {}) => {
  const expansion = useSharedValue(0);
  const [buttonText, setButtonText] = useState('');
  const { colors } = useTheme();
  const closeColor = Color(colors.button)
    .lighten(0.2)
    .string();
  const closePressedColor = Color(colors.button)
    .lighten(0.1)
    .string();

  const showMessage = message => {
    if (message) setButtonText(message);

    const expand = withTiming(1, { duration: animationDuration, easing: Easing.inOut(Easing.exp) });
    const shrink = withTiming(0, { duration: animationDuration - 200, easing: Easing.inOut(Easing.exp) }, () =>
      runOnJS(setButtonText)(''),
    );
    expansion.value = withSequence(expand, withDelay(3000, shrink));
  };

  const closeMessage = () => {
    expansion.value = withTiming(0, { duration: animationDuration - 200, easing: Easing.inOut(Easing.exp) }, () =>
      runOnJS(setButtonText)(''),
    );
  };

  const animatedExpansionStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(expansion.value, [0, 1], [size, maxExpansionWidth], Extrapolate.CLAMP),
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    const rotate = interpolate(expansion.value, [0, 1], [0, 180], Extrapolate.CLAMP);
    const backgroundColor = interpolateColor(
      expansion.value,
      [0, 1],
      [isPressed ? colors.buttonPressed : colors.button, isPressed ? closePressedColor : closeColor],
    );

    return {
      transform: [{ rotate: `${rotate}deg` }],
      backgroundColor,
    };
  });

  const animatedMessageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(expansion.value, [0, 0.65, 1], [0, 0, 1], Extrapolate.CLAMP),
    };
  });

  return {
    expansion,
    buttonText,
    showMessage,
    closeMessage,
    animatedExpansionStyle,
    animatedButtonStyle,
    animatedMessageStyle,
  };
};

export default useAnimatedActionButton;
