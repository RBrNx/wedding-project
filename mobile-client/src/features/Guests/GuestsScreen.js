import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Layout } from 'library/styles';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import PartyIllustration from './components/PartyIllustration';
import AddGuestSheet from './components/AddGuestSheet';
import GuestFlatlist from './components/GuestFlatlist';

const { height } = Dimensions.get('window');

const GuestsScreen = () => {
  const scrollY = useSharedValue(0);
  const [showAddGuestSheet, setShowAddGuestSheet] = useState(false);

  const animatedImageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [height * 0.55, height * 0.175], [1, 0], Extrapolate.CLAMP);
    const scale = interpolate(scrollY.value, [height * 0.55, height * 0.175], [1, 0.2], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Container>
      <StyledDashboardHeader title='Guests' />
      <IllustrationContainer style={animatedImageStyle}>
        <PartyIllustration size='100%' />
      </IllustrationContainer>
      <GuestFlatlist
        showAddGuestSheet={showAddGuestSheet}
        setShowAddGuestSheet={setShowAddGuestSheet}
        scrollPosition={scrollY}
      />
      <AddGuestSheet active={showAddGuestSheet} onDismiss={() => setShowAddGuestSheet(false)} />
    </Container>
  );
};

const Container = styled.View`
  padding-top: ${Layout.statusBarHeight}px;
  flex: 1;
`;

const StyledDashboardHeader = styled(DashboardHeader)`
  padding-horizontal: 5%;
`;

const IllustrationContainer = styled(Animated.View)`
  padding-horizontal: 5%;
  height: 40%;
`;

export default GuestsScreen;
