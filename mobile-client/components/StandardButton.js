import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { constantStyles } from '../styles/theming';
import TouchableNative from './TouchableNative';

const StandardButton = ({ onPress, raised, text }) => {
  const { colors } = useTheme();
  const buttonStyles = [styles.button, { backgroundColor: colors.secondary }];
  if (raised) buttonStyles.push({ ...constantStyles.inputShadow });

  return (
    <TouchableNative style={buttonStyles} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableNative>
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
