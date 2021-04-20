import React from 'react';
import styled from 'styled-components/native';
import { darken } from 'library/utils/colours';
import { Colours, Outlines, Typography } from 'library/styles';
import StandardPressable from './StandardPressable';

const StandardButton = ({ onPress, raised, text, loading, icon }) => {
  return (
    <StyledPressable raised={raised} onPress={onPress}>
      {!loading && (
        <>
          <InvisibleIcon>{icon && icon()}</InvisibleIcon>
          <ButtonText>{text}</ButtonText>
          {icon && icon()}
        </>
      )}
      {loading && <StyledActivityIndicator color='#fff' />}
    </StyledPressable>
  );
};

const StyledPressable = styled(StandardPressable).attrs(() => ({
  pressedStyle: {
    backgroundColor: darken(Colours.secondary, 0.2),
  },
}))`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${Colours.secondary};
  height: 50px;
  border-radius: 25px;
  ${props => props.raised && Outlines.boxShadow}
`;

const ButtonText = styled.Text`
  ${Typography.body};
  color: ${Colours.neutral.white};
  flex: 1;
  text-align: center;
  padding-vertical: 15px;
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  padding-vertical: 15px;
`;

const InvisibleIcon = styled.View`
  opacity: 0;
`;

export default StandardButton;
