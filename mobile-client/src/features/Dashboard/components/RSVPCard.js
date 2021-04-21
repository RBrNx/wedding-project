import Spacer from 'library/components/Spacer';
import StandardPressable from 'library/components/StandardPressable';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import RSVPIllustration from './RSVPIllustration';

const RSVPCard = ({ hasSubmittedRSVP, onPress }) => {
  const title = hasSubmittedRSVP ? `Great, you've RSVP'd!` : 'First things first,';
  const subtitle = hasSubmittedRSVP
    ? `you can still view or edit your response`
    : `let's send your RSVP to the happy couple!`;

  return (
    <CardContainer onPress={onPress}>
      <CardInner>
        <CardTitle>{title}</CardTitle>
        <Spacer size={5} />
        <CardSubTitle>{subtitle}</CardSubTitle>
        <StyledRSVPIllustration size={250} />
        <Spacer flex />
        <LinkText>Take me there →</LinkText>
      </CardInner>
    </CardContainer>
  );
};

const CardContainer = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  width: 100%;
  height: 200px;
  ${Outlines.boxShadow};
  ${Outlines.borderRadius};
  background-color: ${Theme.card};
`;

const CardInner = styled.View`
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

const StyledRSVPIllustration = styled(RSVPIllustration)`
  position: absolute;
  right: -100px;
  top: -45px;
  transform: rotate(30deg);
`;

const LinkText = styled.Text`
  ${Typography.h4};
  color: ${Colours.secondary};
`;

export default RSVPCard;
