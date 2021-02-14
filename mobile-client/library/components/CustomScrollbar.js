import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const CustomScrollbar = ({ handleSize, animatedHandleStyle, style, handleStyle }) => {
  return (
    <Animated.View style={[styles.scrollbarContainer, style]}>
      <Animated.View style={[styles.scrollbarHandle, { height: handleSize }, animatedHandleStyle, handleStyle]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollbarContainer: {
    position: 'absolute',
    right: 2,
    top: 10,
    width: 6,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  scrollbarHandle: {
    width: 2,
    borderRadius: 8,
    backgroundColor: 'darkgray',
  },
});

export default CustomScrollbar;
