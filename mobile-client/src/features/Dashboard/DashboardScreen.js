import { useAuth } from 'context';
import Spacer from 'library/components/Spacer';
import { Colours, Layout, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import DashboardHeader from './components/DashboardHeader';
import MemoriesCard from './components/MemoriesCard';
import RSVPCard from './components/RSVPCard';

const DashboardScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const { firstName, lastName } = currentUser;
  const fullName = `${firstName} ${lastName}`;
  const hasSubmittedRSVP = !!currentUser?.rsvpForm;

  return (
    <Container>
      <DashboardHeader fullName={fullName} />
      <Spacer size={40} />
      <HeadingText>{`Hello,\n${fullName} 👋`}</HeadingText>
      <Spacer size={40} />
      <RSVPCard hasSubmittedRSVP={hasSubmittedRSVP} onPress={() => navigation.navigate('SubmitRSVP')} />
      <Spacer size={10} />
      <MemoriesCard />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-horizontal: 5%;
  padding-top: ${Layout.statusBarHeight}px;
  padding-bottom: 25px;
`;

const HeadingText = styled.Text`
  ${Typography.h1}
  text-align: left;
  color: ${Colours.neutral.white};
`;

export default DashboardScreen;
