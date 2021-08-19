import { Colours, Layout, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import Spacer from 'library/components/Spacer';
import { useAuth } from 'context';
import VenueDetails from './components/VenueDetails';
import WeddingSchedule from './components/WeddingSchedule';
import WeddingMenu from './components/WeddingMenu';

const DetailsScreen = () => {
  const { eventInfo } = useAuth();
  const { venue } = eventInfo;

  return (
    <Container>
      <DashboardHeader title='Details' />
      <Spacer size={40} />
      <HeadingText>{`It's all in\nthe details 🗺️`}</HeadingText>
      <Spacer size={10} />
      <SubtitleText>Find out about the where, when, what time and most importantly of all - the meal!</SubtitleText>
      <Spacer size={20} />
      <VenueDetails venue={venue} />
      <Spacer size={20} />
      <WeddingSchedule />
      <Spacer size={20} />
      <WeddingMenu />
    </Container>
  );
};

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: '5%',
    paddingTop: Layout.statusBarHeight,
    paddingBottom: 25,
  },
}))`
  flex: 1;
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

export default DetailsScreen;
