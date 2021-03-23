import React, { useState } from 'react';
import { Pressable } from 'react-native';
import BackButtonImage from './BackButtonImage';

const BackButton = ({ size = 48, icon, onPress, onPressIn, onPressOut, style, backImageStyle }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: isPressed ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      onPress={onPress}
      onPressIn={() => {
        setIsPressed(true);
        if (onPressIn) onPressIn();
      }}
      onPressOut={() => {
        setIsPressed(false);
        if (onPressIn) onPressOut();
      }}
    >
      {icon ? icon() : <BackButtonImage style={backImageStyle} />}
    </Pressable>
  );
};

export default BackButton;
