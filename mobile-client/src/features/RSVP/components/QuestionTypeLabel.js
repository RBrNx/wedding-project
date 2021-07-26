import Color from 'color';
import StandardPressable from 'library/components/StandardPressable';
import { QuestionType } from 'library/enums';
import { Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components';

const QuestionTypeLabel = ({ type, style, pressedStyle, onPress }) => {
  const { color, text } = QuestionType[type];

  return (
    <StyledPressable colour={color} style={style} pressedStyle={pressedStyle} onPress={onPress}>
      <Label>{text}</Label>
    </StyledPressable>
  );
};

const StyledPressable = styled(StandardPressable).attrs({
  pressedStyle: {
    opacity: 0.75,
  },
})`
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
  color: ${Theme.card};
  ${Outlines.borderRadius};
`;

export default QuestionTypeLabel;
