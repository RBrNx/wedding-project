import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const MoonIcon = ({ size, style, primaryColor, secondaryColor }) => {
  return (
    <View style={[{ height: size || 50, width: size || 50 }, style]}>
      <Svg width='100%' height='100%' viewBox='0 0 48 48'>
        <Path
          d='M20.848 27.134A17.853 17.853 0 0041 30.675 17.849 17.849 0 1117.3 7a17.815 17.815 0 003.548 20.134z'
          fill='#2991cc'
          fillRule='evenodd'
        />
      </Svg>
    </View>
  );
};

export default MoonIcon;
