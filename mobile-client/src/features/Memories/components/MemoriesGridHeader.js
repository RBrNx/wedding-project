import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import Spacer from 'library/components/Spacer';
import { Colours, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';

const MemoriesGridHeader = () => {
  return (
    <Container>
      <DashboardHeader title='Memories' />
      <Spacer size={40} />
      <HeadingText>{`Relive\nthose memories 📸`}</HeadingText>
      <Spacer size={10} />
      <SubtitleText>
        Marriage isn&apos;t just about the big day, it&apos;s about the family, friends and experiences along the
        journey
      </SubtitleText>
      <Spacer size={20} />
    </Container>
  );
};

const Container = styled.View`
  padding-horizontal: 5%;
`;

const HeadingText = styled.Text`
  ${Typography.h1}
  text-align: left;
  color: ${Colours.neutral.white};
`;

const SubtitleText = styled.Text`
  ${Typography.h4};
  text-align: left;
  color: ${Colours.neutral.grey2};
`;

export default MemoriesGridHeader;
