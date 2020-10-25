import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { constantStyles } from '../styles/theming';

const StandardButton = ({ onPress, raised, text, loading }) => {
  const { colors } = useTheme();
  const backgroundColor = colors.secondary;
  const pressedColour = Color(colors.secondary)
    .darken(0.2)
    .toString();

  const renderButtonStyles = ({ pressed }) => {
    const buttonStyles = [
      styles.button,
      {
        backgroundColor: pressed ? pressedColour : backgroundColor,
      },
    ];

    if (raised) buttonStyles.push({ ...constantStyles.inputShadow });

    return buttonStyles;
  };

  return (
    <Pressable style={renderButtonStyles} onPress={onPress}>
      {!loading && <Text style={styles.text}>{text}</Text>}
      {loading && <ActivityIndicator color='#fff' />}
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
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
});

export default StandardButton;
