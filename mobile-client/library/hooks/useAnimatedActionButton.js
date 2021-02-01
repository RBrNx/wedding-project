import { useTheme } from '@react-navigation/native';
import Color from 'color';
import { useEffect, useState } from 'react';
import {
  Easing,
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const useAnimatedActionButton = ({
  size,
  label,
  maxExpansionWidth,
  isPressed,
  animationDuration,
  onMessageClose,
  errorMessage,
  expandToFullButton,
} = {}) => {
  const expansion = useSharedValue(0);
  const [buttonText, setButtonText] = useState('');
  const [isFullSize, setIsFullSize] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const { colors } = useTheme();
  const closeColor = Color(colors.button)
    .lighten(0.2)
    .string();
  const closePressedColor = Color(colors.button)
    .lighten(0.1)
    .string();

  const updateMessageState = newState => {
    const currState = isShowingMessage;

    if (newState !== currState) {
      setIsShowingMessage(newState);
      if (newState === false && onMessageClose) onMessageClose();
    }
  };

  useDerivedValue(() => {
    if (expansion.value > 0.5 && !isShowingMessage) runOnJS(updateMessageState)(true);
    else if (expansion.value <= 0.5 && isShowingMessage) runOnJS(updateMessageState)(false);
  }, [isShowingMessage]);

  useEffect(() => {
    if (errorMessage) showMessage(errorMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  useEffect(() => {
    if (expandToFullButton) expandToFullSize(label);
    else closeMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandToFullButton]);

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
    setTimeout(() => setIsFullSize(false), (animationDuration - 200) / 2);
  };

  const expandToFullSize = text => {
    if (text) setButtonText(text);

    expansion.value = withTiming(1, { duration: animationDuration, easing: Easing.inOut(Easing.exp) });
    setIsFullSize(true);
  };

  const animatedExpansionStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(expansion.value, [0, 1], [size, maxExpansionWidth], Extrapolate.CLAMP),
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(expansion.value, [0, 0.3], [1, 0], Extrapolate.CLAMP);
    const rotate = interpolate(expansion.value, [0, 1], [0, 180], Extrapolate.CLAMP);
    const backgroundColor = interpolateColor(
      expansion.value,
      [0, 1],
      [isPressed ? colors.buttonPressed : colors.button, isPressed ? closePressedColor : closeColor],
    );

    return {
      transform: [{ rotate: `${rotate}deg` }],
      backgroundColor,
      opacity: isFullSize ? opacity : 1,
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
    expandToFullSize,
    isFullSize,
    isShowingMessage,
    animatedExpansionStyle,
    animatedButtonStyle,
    animatedMessageStyle,
  };
};

export default useAnimatedActionButton;
