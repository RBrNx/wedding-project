import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { constantStyles } from '../../styles/theming';

const StandardActionButton = ({ size = 56, raised, icon, style }) => {
  const { colors } = useTheme();
  const backgroundColor = colors.secondary;
  const pressedColour = Color(colors.secondary)
    .darken(0.2)
    .toString();

  const renderButtonStyles = ({ pressed }) => {
    const buttonStyles = [
      styles.button,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        right: 16,
        bottom: 16,
        backgroundColor: pressed ? pressedColour : backgroundColor,
      },
      style,
    ];

    if (raised) buttonStyles.push({ ...constantStyles.inputShadow });

    return buttonStyles;
  };

  return (
    <View style={styles.container}>
      <Pressable style={renderButtonStyles} onPress={() => {}}>
        {icon && icon()}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
  },
  button: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StandardActionButton;
