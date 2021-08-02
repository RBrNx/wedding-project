import StandardPillPressable from 'library/components/StandardPillPressable';
import { QuestionGuestType } from 'library/enums';
import { Theme } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';

const GuestTypeLabel = ({ type, style, selected, onPress }) => {
  const { color, text } = QuestionGuestType[type];

  return <StyledPillPressable colour={color} text={text} style={style} onPress={onPress} selected={selected} />;
};

const StyledPillPressable = styled(StandardPillPressable)`
  border: 2px solid ${props => (props.selected ? Theme.detailTextColour : 'transparent')};
`;

export default GuestTypeLabel;
