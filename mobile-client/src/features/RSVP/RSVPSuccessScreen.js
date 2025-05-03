import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Colours, Layout, Typography } from 'library/styles';
import { usePreventGoingBack } from 'library/hooks';
import Spacer from 'library/components/Spacer';
import StandardButton from 'library/components/StandardButton';
import ConfettiCannon from './components/ConfettiCannon';
import SuccessAnimation from './components/SuccessAnimation';

const RSVPSuccessScreen = ({ route, navigation }) => {
  const fadeIn = useSharedValue(0);
  const { isAttending = false } = route?.params || {};
  usePreventGoingBack();

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
  }));

  return (
    <Container style={animatedContainerStyle}>
      <ConfettiCannon initialDelay={750} />
      <SuccessAnimation size={250} />
      <TextContainer>
        <StyledHeaderText>Your response has been sent to the happy couple 💌</StyledHeaderText>
        <Spacer size={30} />
        <StyledText>
          {isAttending
            ? 'Conor & Lyndsay are excited to have you share their special day with them!'
            : 'Conor & Lyndsay are sorry to hear that you are unable to attend their special day, you will be missed!'}
        </StyledText>
      </TextContainer>
      <StandardButton text='Continue' raised onPress={() => navigation.navigate('Dashboard')} />
    </Container>
  );
};

const Container = styled(Animated.View)`
  flex: 1;
  padding: 5%;
  ${Layout.safeArea}
  ${Layout.flexCenter}
`;

const TextContainer = styled.View`
  flex: 0.65;
`;

const StyledHeaderText = styled.Text`
  text-align: center;
  color: ${Colours.neutral.white};
  ${Typography.h2};
`;

const StyledText = styled.Text`
  text-align: center;
  color: ${Colours.neutral.white};
  ${Typography.body};
`;

export default RSVPSuccessScreen;
