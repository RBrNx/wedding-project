import React from 'react';
import BackButtonImage from 'library/components/BackButtonImage';
import styled from 'styled-components';
import { Layout } from 'library/styles';
import StandardPressable from './StandardPressable';

const BackButton = ({ size = 48, icon, onPress, style, backImageStyle }) => {
  return (
    <StyledPressable style={style} size={size} onPress={onPress}>
      {icon ? icon() : <BackButtonImage style={backImageStyle} />}
    </StyledPressable>
  );
};

const StyledPressable = styled(StandardPressable).attrs(() => ({
  pressedStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
}))`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  background-color: transparent;
  ${Layout.flexCenter}
`;

export default BackButton;
