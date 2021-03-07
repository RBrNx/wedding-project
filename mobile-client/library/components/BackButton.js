import React from 'react';
import { Pressable } from 'react-native';
import BackButtonImage from './BackButtonImage';

const BackButton = ({ size = 56, icon, onPress, onPressIn, onPressOut, style, backImageStyle }) => {
  return (
    <Pressable
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      {icon ? icon() : <BackButtonImage style={backImageStyle} />}
    </Pressable>
  );
};

export default BackButton;
