import React from 'react';
import { Pressable } from 'react-native';
import { constantStyles } from '../../styles/theming';

const StandardPressable = ({ children, style, onPress, raised, pressedStyle }) => {
  const renderPressableStyles = ({ pressed }) => {
    const pressableStyles = [style];

    if (raised) pressableStyles.push({ ...constantStyles.cardShadow });
    if (pressed) pressableStyles.push({ ...pressedStyle });

    return pressableStyles;
  };

  return (
    <Pressable style={renderPressableStyles} onPress={onPress}>
      {children}
    </Pressable>
  );
};

export default StandardPressable;
