import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import LottieAnimation from 'library/components/LottieAnimation';
import { Layout } from 'library/styles';
import SuccessAnimationFile from 'assets/animations/success.json';

const SuccessAnimation = ({ size, style }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Container style={{ opacity }}>
      <LottieAnimation style={style} source={SuccessAnimationFile} size={size} autoPlay />
    </Container>
  );
};

const Container = styled(Animated.View)`
  flex: 1;
  ${Layout.flexCenter};
`;

export default SuccessAnimation;
