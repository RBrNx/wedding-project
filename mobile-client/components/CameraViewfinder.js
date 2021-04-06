import React from 'react';
import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Svg, { Defs, Rect, Mask } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const CameraViewfinder = ({ style, size = 250, scannerModeIndex }) => {
  const qrViewfinderStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scannerModeIndex.value, [0, 1], [1, 0], Extrapolate.CLAMP),
  }));

  const fullViewfinderStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scannerModeIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP),
  }));

  return (
    <>
      <Animated.View style={[styles.viewfinder, styles.fullViewfinder, style, fullViewfinderStyle]} />
      <Animated.View style={[styles.viewfinder, style, qrViewfinderStyle]}>
        <Svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <Defs>
            <Mask id='Mask'>
              <Rect x='0' y='0' width='100%' height='100%' fill='#fff' />
              <Rect
                x={width / 2 - size / 2}
                y={height / 2 - size / 2 + StatusBar.currentHeight}
                width={size}
                height={size}
                rx='15'
                fill='#000'
              />
            </Mask>
          </Defs>
          <Rect width='100%' height='100%' fill='rgba(0, 0, 0, .75)' mask='url(#Mask)' />
        </Svg>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  viewfinder: {
    height: '100%',
    width: '100%',
    ...StyleSheet.absoluteFill,
  },
  fullViewfinder: {
    backgroundColor: 'rgba(0, 0, 0, .75)',
  },
});

export default CameraViewfinder;
