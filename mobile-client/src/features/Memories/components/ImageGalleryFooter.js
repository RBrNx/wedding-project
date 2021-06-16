import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components';
import { Colours, Typography } from 'library/styles';
import { LinearGradient } from 'expo-linear-gradient';

const ImageGalleryFooter = ({ headerFooterVisible, captions, index }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: headerFooterVisible.value,
  }));
  const caption = captions[index] ? decodeURIComponent(captions[index]) : null;

  return (
    <Container style={animatedStyle}>
      <Gradient>{caption && <ImageCaption>{caption}</ImageCaption>}</Gradient>
    </Container>
  );
};

const Container = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 0px;
  z-index: 99;
  bottom: 0;
  position: absolute;
  width: 100%;
`;

const Gradient = styled(LinearGradient).attrs(() => ({
  colors: ['rgba(0, 0, 0, 0.75)', 'rgba(0, 0, 0, 0)'],
  start: { x: 0, y: 1 },
  end: { x: 0, y: 0 },
}))`
  width: 100%;
  height: 100%;
`;

const ImageCaption = styled.Text`
  padding: 20px;
  flex-direction: row;
  color: ${Colours.neutral.white};
  text-shadow: 2px 2px #000;
  ${Typography.h4}
`;

export default ImageGalleryFooter;
