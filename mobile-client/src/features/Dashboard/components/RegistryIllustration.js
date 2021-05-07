import { useCurrentTheme } from 'context';
import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const outlineColour = {
  light: '#2f2e41',
  dark: '#e0e0e0',
};

const WeddingDetailsIllustration = ({ size, style }) => {
  const { currentTheme } = useCurrentTheme();

  return (
    <View style={[{ height: size || 50, width: size || 50 }, style]}>
      <Svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 125.654 167.763'>
        <Path data-name='Rectangle 2' fill='#ff6584' d='M33.089 9.772L50.015 0l9.773 16.926-16.926 9.772z' />
        <Path
          data-name='Path 4'
          d='M50.228 30.225l-10.2-17.674 17.674-10.2 10.2 17.674zm-9.025-17.358l9.344 16.183 16.178-9.34-9.341-16.179z'
          fill={outlineColour[currentTheme]}
        />
        <Circle
          data-name='Ellipse 4'
          cx={8.202}
          cy={8.202}
          r={8.202}
          transform='translate(26.192 61.314)'
          fill='#d0cde1'
        />
        <Path
          data-name='Path 5'
          d='M40.438 78.151a8.634 8.634 0 118.631-8.634 8.634 8.634 0 01-8.631 8.634zm0-16.4a7.77 7.77 0 107.771 7.77 7.77 7.77 0 00-7.771-7.774z'
          fill={outlineColour[currentTheme]}
        />
        <Path
          data-name='Path 6'
          d='M86.14 165.171H6.707a3.674 3.674 0 01-3.669-3.669v-73.82a3.674 3.674 0 013.669-3.669H86.14a3.674 3.674 0 013.669 3.669v73.819a3.674 3.674 0 01-3.669 3.67z'
          fill='#2991cc'
        />
        <Path
          data-name='Path 7'
          d='M52.033 167.763H40.809a3.674 3.674 0 01-3.669-3.669v-78.6a3.674 3.674 0 013.669-3.669h11.224a3.674 3.674 0 013.669 3.669v78.6a3.674 3.674 0 01-3.669 3.669z'
          fill='#3f3d56'
        />
        <Path
          data-name='Path 8'
          d='M107.241 76.708c-.464 7.615-10.751 13.185-10.751 13.185s-9.534-6.777-9.07-14.392 10.753-13.188 10.753-13.188 9.533 6.778 9.068 14.395z'
          fill='#3f3d56'
        />
        <Path
          data-name='Path 9'
          d='M107.708 100.465c-7.617-.44-13.218-10.71-13.218-10.71s6.748-9.555 14.364-9.115 13.218 10.71 13.218 10.71-6.748 9.555-14.364 9.115z'
          fill='#3f3d56'
        />
        <Path
          data-name='Path 10'
          d='M89.591 93.044v28.181l-28.03-37h21.352z'
          opacity={0.1}
          style={{
            isolation: 'isolate',
          }}
        />
        <Path
          data-name='Path 11'
          d='M113.386 141.284a3.664 3.664 0 01-2.929-1.452l-58.396-77.08a3.669 3.669 0 01.709-5.141l8.6-6.518a3.669 3.669 0 015.141.709l58.4 77.074a3.669 3.669 0 01-.709 5.141l-8.6 6.518a3.649 3.649 0 01-2.216.749z'
          fill='#2991cc'
        />
        <Path data-name='Rectangle 3' fill='#3f3d56' d='M75.216 92.606l14.796-11.21 11.21 14.796-14.796 11.21z' />
        <Path data-name='Rectangle 4' fill='#d0cde1' d='M8.844 43.889l5.062-18.88 18.88 5.062-5.062 18.88z' />
        <Path
          data-name='Path 12'
          d='M19.712 51.771L0 46.491l5.282-19.713 19.712 5.282zM1.057 45.879l18.045 4.835 4.835-18.045-18.045-4.835z'
          fill={outlineColour[currentTheme]}
        />
      </Svg>
    </View>
  );
};

export default WeddingDetailsIllustration;
