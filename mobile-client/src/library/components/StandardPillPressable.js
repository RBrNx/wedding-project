import Color from 'color';
import StandardPressable from 'library/components/StandardPressable';
import { Colours, Outlines, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import Spacer from 'library/components/Spacer';

const StandardPillPressable = ({ colour, text, style, pressedStyle, labelStyle, onPress, icon }) => {
  return (
    <StyledPressable colour={colour} style={style} pressedStyle={pressedStyle} onPress={onPress}>
      {icon && (
        <>
          {icon()}
          <Spacer size={5} />
        </>
      )}
      <Label style={labelStyle}>{text}</Label>
    </StyledPressable>
  );
};

const StyledPressable = styled(StandardPressable).attrs({
  pressedStyle: {
    opacity: 0.75,
  },
})`
  flex-direction: row;
  align-self: flex-start;
  padding-vertical: 2.5px;
  padding-horizontal: 10px;
  margin-vertical: 5px;
  background-color: ${props => Color(props.colour).fade(0.25)};
  ${Outlines.borderRadius};
`;

const Label = styled.Text`
  ${Typography.small};
  ${Typography.boldFont};
  color: ${Colours.neutral.grey5};
`;

export default StandardPillPressable;
