import React from 'react';
import { Keyboard, Pressable, StyleSheet } from 'react-native';

const DismissKeyboard = ({ children, style }) => {
  return (
    <Pressable style={[styles.container, style]} onPress={() => Keyboard.dismiss()}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default DismissKeyboard;
