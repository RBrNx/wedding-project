import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const DismissKeyboard = ({ children, style }) => {
  return (
    <TouchableWithoutFeedback style={[styles.container, style]} onPress={() => Keyboard.dismiss()}>
      <>{children}</>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default DismissKeyboard;
