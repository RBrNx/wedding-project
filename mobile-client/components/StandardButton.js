import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { constantStyles } from '../styles/theming';
import TouchableNative from './TouchableNative';

const StandardButton = ({ onPress, raised, text }) => {
  const { colors } = useTheme();

  const renderButtonStyles = ({ pressed }) => {
    const buttonStyles = [
      styles.button,
      {
        backgroundColor: pressed
          ? Color(colors.secondary)
              .darken(0.2)
              .toString()
          : colors.secondary,
      },
    ];
    if (raised) buttonStyles.push({ ...constantStyles.inputShadow });

    return buttonStyles;
  };

  return (
    <Pressable style={renderButtonStyles} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default StandardButton;
