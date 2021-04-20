import { Outlines } from 'library/styles';
import React, { useState } from 'react';
import styled from 'styled-components/native';

const StandardPressable = ({ children, style, onPress, raised, pressedStyle, onLayout }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <StyledPressable
      style={[style, pressed ? pressedStyle : {}]}
      raised={raised}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onLayout={onLayout}
    >
      {children}
    </StyledPressable>
  );
};

const StyledPressable = styled.Pressable`
  ${props => props.raised && Outlines.boxShadow}
`;

export default StandardPressable;
