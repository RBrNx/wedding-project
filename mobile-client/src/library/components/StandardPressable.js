import { Outlines } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';

const StandardPressable = ({ children, style, onPress, raised, pressedStyle, onLayout }) => {
  const renderPressableStyles = ({ pressed }) => {
    const pressableStyles = [style];

    if (pressed) pressableStyles.push({ ...pressedStyle });

    return pressableStyles;
  };

  return (
    <StyledPressable style={renderPressableStyles} raised={raised} onPress={onPress} onLayout={onLayout}>
      {children}
    </StyledPressable>
  );
};

const StyledPressable = styled.Pressable`
  ${props => props.raised && Outlines.boxShadow}
`;

export default StandardPressable;
