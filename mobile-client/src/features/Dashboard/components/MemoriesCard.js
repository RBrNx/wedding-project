import Spacer from 'library/components/Spacer';
import StandardPressable from 'library/components/StandardPressable';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import MemoriesIllustration from './MemoriesIllustration';

const MemoriesCard = ({ onPress }) => {
  return (
    <CardContainer onPress={onPress}>
      <CardInner>
        <CardTitle>Share your favourite memories!</CardTitle>
        <Spacer size={5} />
        <CardSubTitle>A wedding isn&apos;t just about the big day...</CardSubTitle>
        <StyledMemoriesIllustration size={175} />
        <Spacer flex />
        <LinkText>Check them out →</LinkText>
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
  align-items: flex-end;
`;

const CardTitle = styled.Text`
  ${Typography.h3};
  color: ${Theme.headerTextColour};
  width: 70%;
  text-align: right;
`;

const CardSubTitle = styled.Text`
  ${Typography.h4};
  color: ${Theme.bodyTextColour};
  width: 70%;
  text-align: right;
`;

const StyledMemoriesIllustration = styled(MemoriesIllustration)`
  position: absolute;
  left: -35px;
  top: 12.5px;
`;

const LinkText = styled.Text`
  ${Typography.h4};
  color: ${Colours.secondary};
`;

export default MemoriesCard;
