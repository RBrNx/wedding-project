import React from 'react';
import styled from 'styled-components/native';
import { Colours, Layout } from '../../styles';
import { darken } from '../helpers/colours';
import Pressable from './Pressable';

const StandardRoundPressable = ({ size = 56, colour = Colours.secondary, style, icon, onPress }) => {
  return (
    <StyledPressable
      size={size}
      style={({ pressed }) => [{ backgroundColor: pressed ? darken(colour, 0.2) : colour }, style]}
      onPress={onPress}
    >
      {icon && icon()}
    </StyledPressable>
  );
};

const StyledPressable = styled(Pressable)`
  ${Layout.flexCenter};
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
`;

export default StandardRoundPressable;
