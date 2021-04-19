import React from 'react';
import styled from 'styled-components/native';
import { Colours, Outlines, Typography } from '../styles';
import Pressable from '../../../library/components/Pressable';
import { darken } from '../../../library/helpers/colours';

const StandardButton = ({ onPress, raised, text, loading, icon }) => {
  return (
    <StyledPressable
      style={({ pressed }) => ({ backgroundColor: pressed ? darken(Colours.secondary, 0.2) : Colours.secondary })}
      raised={raised}
      onPress={onPress}
    >
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

const StyledPressable = styled(Pressable)`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 50px;
  border-radius: 25px;
  ${props => props.raised && Outlines.boxShadow}
`;

const ButtonText = styled.Text`
  ${Typography.regular};
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
