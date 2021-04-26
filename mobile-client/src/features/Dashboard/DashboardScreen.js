import { useAuth } from 'context';
import Spacer from 'library/components/Spacer';
import { Colours, Layout, Typography } from 'library/styles';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import DashboardHeader from './components/DashboardHeader';
import MemoriesCard from './components/MemoriesCard';
import RegistryCard from './components/RegistryCard';
import RSVPCard from './components/RSVPCard';
import ViewRSVPSheet from './components/ViewRSVPSheet';
import WeddingDetailsCard from './components/WeddingDetailsCard';

const DashboardScreen = ({ navigation }) => {
  const [showRSVPSheet, setShowRSVPSheet] = useState(false);
  const { currentUser } = useAuth();
  const { firstName, lastName } = currentUser;
  const fullName = `${firstName} ${lastName}`;
  const hasSubmittedRSVP = !!currentUser?.rsvpForm;

  return (
    <>
      <Container>
        <DashboardHeader fullName={fullName} />
        <Spacer size={40} />
        <HeadingText>{`Hello,\n${fullName} 👋`}</HeadingText>
        <Spacer size={40} />
        <RSVPCard
          hasSubmittedRSVP={hasSubmittedRSVP}
          onPress={() => {
            if (hasSubmittedRSVP) setShowRSVPSheet(true);
            else navigation.navigate('SubmitRSVP');
          }}
        />
        <Spacer size={20} />
        <MemoriesCard onPress={() => navigation.navigate('Memories')} />
        <Spacer size={20} />
        <WeddingDetailsCard />
        <Spacer size={20} />
        <RegistryCard onPress={() => navigation.navigate('Registry')} />
      </Container>
      <ViewRSVPSheet
        rsvpForm={currentUser?.rsvpForm}
        active={showRSVPSheet}
        onDismiss={() => setShowRSVPSheet(false)}
      />
    </>
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

export default DashboardScreen;
