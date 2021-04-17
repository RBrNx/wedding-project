import React from 'react';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import theme from 'styled-theming';
import { Colours } from '../../styles';

const SCROLLBAR_SPACING = 10;

const CustomScrollbar = ({ handleSize, animatedHandleStyle, style, handleStyle }) => {
  return (
    <ScrollbarContainer style={style}>
      <ScrollbarHandle handleSize={handleSize} style={[animatedHandleStyle, handleStyle]} />
    </ScrollbarContainer>
  );
};

const ScrollbarContainer = styled(Animated.View)`
  position: absolute;
  height: 100%;
  right: 2px;
  width: 6px;
  border-radius: 8px;
  background-color: transparent;
`;

const ScrollbarHandle = styled(Animated.View)`
  width: 2px;
  border-radius: 8px;
  background-color: ${theme('theme', {
    light: Colours.neutral.grey3,
    dark: Colours.neutral.grey4,
  })};
  margin-top: ${SCROLLBAR_SPACING}px;
  height: ${props => props.handleSize - SCROLLBAR_SPACING * 2}px;
`;

export default CustomScrollbar;
