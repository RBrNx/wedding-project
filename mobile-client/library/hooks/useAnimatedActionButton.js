import { useTheme } from '@react-navigation/native';
import Color from 'color';
import { Extrapolate, interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const useAnimatedActionButton = ({ size, maxExpansionWidth, isPressed }) => {
  const expansion = useSharedValue(0);
  const { colors } = useTheme();
  const closeColor = Color(colors.button)
    .lighten(0.2)
    .string();
  const closePressedColor = Color(colors.button)
    .lighten(0.1)
    .string();

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
    animatedExpansionStyle,
    animatedButtonStyle,
    animatedMessageStyle,
  };
};

export default useAnimatedActionButton;
