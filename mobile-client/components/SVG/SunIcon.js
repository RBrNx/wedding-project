import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const SunIcon = ({ size, style, primaryColor, secondaryColor }) => {
  return (
    <View style={[{ height: size || 50, width: size || 50 }, style]}>
      <Svg width='100%' height='100%' viewBox='0 0 48 48'>
        <Path
          d='M36.021 11.979L36 19l5 5-5 5 .021 7.021L29 36l-5 5-5-5-7.021.021L12 29l-5-5 5-5-.021-7.021L19 12l5-5 5 5z'
          fill='#FF4D56'
          fillRule='evenodd'
        />
        <Circle cx={24} cy={24} r={9} fill='#14233c' />
      </Svg>
    </View>
  );
};

export default SunIcon;
