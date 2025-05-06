import StandardPillPressable from 'library/components/StandardPillPressable';
import { Theme } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';

const EnumLabel = ({ type, style, selected, onPress, enumObject }) => {
  const { color, text } = enumObject[type];

  return <StyledPillPressable colour={color} text={text} style={style} onPress={onPress} selected={selected} />;
};

const StyledPillPressable = styled(StandardPillPressable)`
  border: 2px solid ${props => (props.selected ? Theme.detailTextColour : 'transparent')};
`;

export default EnumLabel;
