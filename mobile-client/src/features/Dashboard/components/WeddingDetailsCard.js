import Spacer from 'library/components/Spacer';
import StandardPressable from 'library/components/StandardPressable';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { darken } from 'library/utils/colours';
import WeddingDetailsIllustration from './WeddingDetailsIllustration';

const WeddingDetailsCard = ({ onPress }) => {
  return (
    <CardContainer>
      <CardInner onPress={onPress}>
        <CardTitle>Need to know the where and when?</CardTitle>
        <Spacer size={5} />
        <CardSubTitle>The happy couple don&apos;t want you to go missing after all!</CardSubTitle>
        <StyledDetailsIllustration size={125} />
        <Spacer flex />
        <LinkText>Get the info →</LinkText>
      </CardInner>
    </CardContainer>
  );
};

const CardContainer = styled(LinearGradient).attrs(() => ({
  colors: [darken(Colours.tertiary, 0.8), Colours.tertiary],
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
`;

const CardTitle = styled.Text`
  ${Typography.h3};
  color: ${Theme.headerTextColour};
  width: 75%;
`;

const CardSubTitle = styled.Text`
  ${Typography.h4};
  color: ${Theme.bodyTextColour};
  width: 75%;
`;

const StyledDetailsIllustration = styled(WeddingDetailsIllustration)`
  position: absolute;
  right: -25px;
  top: -25px;
  transform: rotate(25deg);
`;

const LinkText = styled.Text`
  ${Typography.h4};
  color: ${Colours.neutral.white};
  text-decoration-line: underline;
`;

export default WeddingDetailsCard;
