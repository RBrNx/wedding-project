import Color from 'color';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const StandardRoundPressable = ({ size = 56, colour, icon, style, pressedStyle, onPress }) => {
  const renderPressableStyles = ({ pressed }) => {
    const pressableStyles = [
      styles.pressable,
      { height: size, width: size, borderRadius: size / 2, backgroundColor: colour },
      style,
    ];

    if (pressed)
      pressableStyles.push({
        backgroundColor: Color(colour)
          .darken(0.25)
          .rgb()
          .toString(),
        ...pressedStyle,
      });

    return pressableStyles;
  };

  return (
    <Pressable style={renderPressableStyles} onPress={onPress}>
      {icon && icon()}
    </Pressable>
  );
};

export default StandardRoundPressable;

const styles = StyleSheet.create({
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
