import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const scrollbarSpacing = 10;

const CustomScrollbar = ({ handleSize, animatedHandleStyle, style, handleStyle }) => {
  return (
    <Animated.View style={[styles.scrollbarContainer, style]}>
      <Animated.View
        style={[
          styles.scrollbarHandle,
          { height: handleSize - scrollbarSpacing * 2 },
          animatedHandleStyle,
          handleStyle,
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollbarContainer: {
    position: 'absolute',
    right: 2,
    width: 6,
    borderRadius: 8,
    backgroundColor: 'transparent',
    height: '100%',
  },
  scrollbarHandle: {
    width: 2,
    borderRadius: 8,
    backgroundColor: 'darkgray',
    marginTop: scrollbarSpacing,
  },
});

export default CustomScrollbar;
