import React from 'react';
import styled, { css } from 'styled-components/native';
import { darken } from 'library/utils/colours';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import StandardPressable from './StandardPressable';

const StandardButton = ({ onPress, raised, outline, text, loading, icon, style, pressedStyle, textStyle }) => {
  return (
    <StyledPressable raised={raised} outline={outline} onPress={onPress} style={style} pressedStyle={pressedStyle}>
      {!loading && (
        <>
          <InvisibleIcon>{icon && icon()}</InvisibleIcon>
          <ButtonText style={textStyle} outline={outline}>
            {text}
          </ButtonText>
          {icon && icon()}
        </>
      )}
      {loading && <StyledActivityIndicator color='#fff' />}
    </StyledPressable>
  );
};

const StyledPressable = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: darken(Colours.secondary, 0.2),
    ...props.pressedStyle,
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
  ${props =>
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${Colours.secondary};
    `}
`;

const ButtonText = styled.Text`
  ${Typography.body};
  color: ${Colours.neutral.white};
  flex: 1;
  text-align: center;
  padding-vertical: 15px;
  ${props =>
    props.outline &&
    css`
      color: ${Theme.headerTextColour};
    `}
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  padding-vertical: 15px;
`;

const InvisibleIcon = styled.View`
  opacity: 0;
`;

export default StandardButton;
