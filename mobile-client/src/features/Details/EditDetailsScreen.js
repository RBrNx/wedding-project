import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Layout } from 'library/styles';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import DetailsIllustration from './components/DetailsIllustration';
import EditDetailsView from './components/EditDetailsView';

const { height } = Dimensions.get('window');

const EditDetailsScreen = () => {
  const scrollY = useSharedValue(0);

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
      <StyledDashboardHeader title='Details' />
      <IllustrationContainer style={animatedImageStyle}>
        <DetailsIllustration size='100%' />
      </IllustrationContainer>
      <EditDetailsView scrollPosition={scrollY} />
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

export default EditDetailsScreen;
