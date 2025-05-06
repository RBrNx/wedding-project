import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import FormIllustration from './components/FormIllustration';
import QuestionFlatlist from './components/QuestionFlatlist';

const { height } = Dimensions.get('window');

const RSVPQuestionsScreen = () => {
  const scrollY = useSharedValue(0);

  const animatedImageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [height * 0.55, height * 0.175], [1, 0], Extrapolation.CLAMP);
    const scale = interpolate(scrollY.value, [height * 0.55, height * 0.175], [1, 0.2], Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Container>
      <StyledDashboardHeader title='RSVP Questions' />
      <IllustrationContainer style={animatedImageStyle}>
        <FormIllustration size='100%' />
      </IllustrationContainer>
      <QuestionFlatlist scrollPosition={scrollY} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const StyledDashboardHeader = styled(DashboardHeader)`
  padding-horizontal: 5%;
`;

const IllustrationContainer = styled(Animated.View)`
  padding-horizontal: 5%;
  height: 40%;
`;

export default RSVPQuestionsScreen;
