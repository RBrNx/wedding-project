import React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Svg, { Defs, Rect, Mask } from 'react-native-svg';
import styled from 'styled-components/native';
import { Layout } from 'library/styles';

const { width, height } = Dimensions.get('window');

const CameraViewfinder = ({ style, size = 250, scannerModeIndex }) => {
  const squareViewfinderAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scannerModeIndex.value, [0.5, 1], [1, 0], Extrapolate.CLAMP),
  }));

  const fullViewfinderAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scannerModeIndex.value, [0, 0.5], [0, 1], Extrapolate.CLAMP),
  }));

  return (
    <>
      <FullViewfinder style={[style, fullViewfinderAnimatedStyle]} />
      <SquareViewfinder style={[style, squareViewfinderAnimatedStyle]}>
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
      </SquareViewfinder>
    </>
  );
};

const FullViewfinder = styled(Animated.View)`
  background-color: rgba(0, 0, 0, 0.75);
  ${Layout.absoluteFill};
`;

const SquareViewfinder = styled(Animated.View)`
  ${Layout.absoluteFill};
`;

export default CameraViewfinder;
