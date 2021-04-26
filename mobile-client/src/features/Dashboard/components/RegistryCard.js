import Spacer from 'library/components/Spacer';
import StandardPressable from 'library/components/StandardPressable';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import RegistryIllustration from './RegistryIllustration';

const RegistryCard = ({ onPress }) => {
  return (
    <CardContainer>
      <CardInner onPress={onPress}>
        <CardTitle>Last but not least,</CardTitle>
        <Spacer size={5} />
        <CardSubTitle>Your presence is the best present, but if you insist...</CardSubTitle>
        <StyledRegistryIllustration size={100} />
        <Spacer flex />
        <LinkText>Show me the registry →</LinkText>
      </CardInner>
    </CardContainer>
  );
};

const CardContainer = styled(LinearGradient).attrs(() => ({
  colors: [Colours.primary, Colours.secondary],
  start: { x: 0, y: 1 },
  end: { x: 0.9, y: 0 },
}))`
  width: 100%;
  height: 200px;
  ${Outlines.boxShadow};
  ${Outlines.borderRadius};
  background-color: ${Theme.card};
`;

const CardInner = styled(StandardPressable).attrs(() => ({
  pressedStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
}))`
  overflow: hidden;
  flex: 1;
  width: 100%;
  padding: 15px;
  ${Outlines.borderRadius};
  align-items: flex-end;
`;

const CardTitle = styled.Text`
  ${Typography.h3};
  color: ${Colours.neutral.white};
  width: 70%;
  text-align: right;
`;

const CardSubTitle = styled.Text`
  ${Typography.h4};
  color: ${Colours.neutral.offWhite};
  width: 60%;
  text-align: right;
`;

const StyledRegistryIllustration = styled(RegistryIllustration)`
  position: absolute;
  left: 15px;
  top: 40px;
`;

const LinkText = styled.Text`
  ${Typography.h4};
  color: ${Colours.neutral.white};
  text-shadow: 0px 1px 2px ${Colours.secondary};
`;

export default RegistryCard;
