import { useFocusEffect } from '@react-navigation/native';
import { useAuth, useDatastore } from 'context';
import Spacer from 'library/components/Spacer';
import { Colours, Layout, Typography } from 'library/styles';
import React, { useCallback, useState } from 'react';
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
  const { eventInfo } = useDatastore();
  const { firstName, lastName } = currentUser || {};
  const fullName = `${firstName} ${lastName}`;
  const hasSubmittedRSVP = !!currentUser?.rsvpForm;

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => setShowRSVPSheet(false), 1000);
      };
    }, []),
  );

  return (
    <>
      <Container>
        <DashboardHeader title='Dashboard' />
        <Spacer size={40} />
        <HeadingText>{`Hello,\n${fullName} 👋`}</HeadingText>
        <Spacer size={40} />
        <RSVPCard
          hasSubmittedRSVP={hasSubmittedRSVP}
          eventDate={eventInfo?.date}
          onPress={() => {
            if (hasSubmittedRSVP) setShowRSVPSheet(true);
            else navigation.navigate('SubmitRSVP');
          }}
        />
        <Spacer size={20} />
        <MemoriesCard onPress={() => navigation.navigate('Memories')} />
        <Spacer size={20} />
        <WeddingDetailsCard onPress={() => navigation.navigate('Details')} />
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
