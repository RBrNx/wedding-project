import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';
import LottieAnimation from 'library/components/LottieAnimation';
import ErrorAnimation from 'assets/animations/error.json';
import { Layout, Theme, Typography } from 'library/styles';

const ErrorMessage = ({ message, size, style }) => {
  const [opacity] = useState(new Animated.Value(0));
  const errorMessage = message || 'Whoops, something has went wrong!';

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Container style={{ opacity }}>
      <LottieAnimation style={style} source={ErrorAnimation} size={size} autoPlay />
      <MessageText>{errorMessage}</MessageText>
    </Container>
  );
};

const Container = styled(Animated.View)`
  flex: 1;
  ${Layout.flexCenter};
`;

const MessageText = styled.Text`
  flex: 0.5;
  text-align: center;
  color: ${Theme.bodyTextColour};
  ${Typography.body};
`;

export default ErrorMessage;
