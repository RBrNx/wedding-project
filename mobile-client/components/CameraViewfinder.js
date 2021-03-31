import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, Rect, Mask } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const CameraViewfinder = ({ style, size = 250 }) => {
  return (
    <View style={[{ height: '100%', width: '100%', ...StyleSheet.absoluteFill }, style]}>
      <Svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
        <Defs>
          <Mask id='Mask'>
            <Rect x='0' y='0' width='100%' height='100%' fill='#fff' />
            <Rect x={width / 2 - size / 2} y={height / 2 - size / 2} width={size} height={size} rx='15' fill='#000' />
          </Mask>
        </Defs>
        <Rect width='100%' height='100%' fill='rgba(0, 0, 0, .5)' mask='url(#Mask)' />
      </Svg>
    </View>
  );
};

export default CameraViewfinder;
