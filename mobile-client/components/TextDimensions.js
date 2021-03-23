import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TextDimensions = ({ text, style, onDimensions }) => {
  return (
    <Text
      style={[styles.text, style]}
      onLayout={event => {
        const dimensions = event.nativeEvent.layout;
        if (onDimensions) onDimensions(dimensions);
      }}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    opacity: 0,
    position: 'absolute',
  },
});

export default TextDimensions;
