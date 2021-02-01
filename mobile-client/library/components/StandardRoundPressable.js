import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const StandardRoundPressable = ({ size = 56, icon, style, pressedStyle }) => {
  const { colors } = useTheme();

  const renderPressableStyles = ({ pressed }) => {
    const pressableStyles = [styles.pressable, { height: size, width: size, borderRadius: size / 2 }, style];

    if (pressed)
      pressableStyles.push({
        backgroundColor: Color(colors.cardHover)
          .fade(0.5)
          .rgb()
          .toString(),
        ...pressedStyle,
      });

    return pressableStyles;
  };

  return <Pressable style={renderPressableStyles}>{icon && icon()}</Pressable>;
};

export default StandardRoundPressable;

const styles = StyleSheet.create({
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
