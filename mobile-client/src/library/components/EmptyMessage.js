import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';
import LottieAnimation from 'library/components/LottieAnimation';
import EmptyAnimation from 'assets/animations/emptyBox.json';
import { Layout, Theme, Typography } from 'library/styles';

const EmptyMessage = ({ message, size, style }) => {
  const animation = useRef(null);
  const [opacity] = useState(new Animated.Value(0));
  const emptyMessage = message || "There doesn't seem to be anything here";

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const onAnimationFinish = () => {
    setTimeout(() => {
      if (animation?.current) animation.current.play();
    }, 3000);
  };

  return (
    <Container style={{ opacity }}>
      <LottieAnimation
        ref={animation}
        style={style}
        source={EmptyAnimation}
        size={size}
        autoPlay
        speed={0.9}
        onAnimationFinish={onAnimationFinish}
      />
      <MessageText>{emptyMessage}</MessageText>
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

export default EmptyMessage;
