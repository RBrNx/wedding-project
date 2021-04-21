import React from 'react';
import styled from 'styled-components/native';
import { Colours, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import InProgressIllustration from './components/InProgressIllustration';

const WorkInProgressScreen = () => {
  return (
    <Container>
      <StyledInProgressIllustration size='100%' />
      <Spacer size={50} />
      <HeadingContainer>
        <HeadingText>Sorry, we haven&apos;t finished this yet.</HeadingText>
        <Spacer size={15} />
        <SubHeadingText>Please check back here in the future for some awesome features!</SubHeadingText>
      </HeadingContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-horizontal: 5%;
`;

const StyledInProgressIllustration = styled(InProgressIllustration)`
  flex: 1;
  margin-top: 50px;
`;

const HeadingContainer = styled.View`
  flex: 1;
`;

const HeadingText = styled.Text`
  ${Typography.h1};
  color: ${Colours.neutral.white};
  text-align: center;
`;

const SubHeadingText = styled.Text`
  ${Typography.h4};
  color: ${Colours.neutral.grey3};
  text-align: center;
`;

export default WorkInProgressScreen;
