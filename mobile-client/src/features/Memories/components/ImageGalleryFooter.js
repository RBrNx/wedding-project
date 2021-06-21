import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components';
import { Colours, Outlines, Typography } from 'library/styles';
import { LinearGradient } from 'expo-linear-gradient';
import UserAvatar from 'react-native-user-avatar';
import { View } from 'react-native';
import Spacer from 'library/components/Spacer';
import { getComplementaryColor, getContrastingTextColor } from 'library/utils/colours';

const ImageGalleryFooter = ({ headerFooterVisible, images, index }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: headerFooterVisible.value,
  }));
  const currentImage = images[index];
  const caption = currentImage?.caption ? decodeURIComponent(currentImage.caption) : null;
  const captionColour = currentImage?.dominantColour ? getComplementaryColor(currentImage.dominantColour) : '#000';

  return (
    <Container style={animatedStyle}>
      {caption && <ImageCaption backgroundColour={captionColour}>{caption}</ImageCaption>}
      <Spacer size={20} />
      <Gradient>
        <UserAvatar size={42} name='ConCon Waston' />
        <Spacer size={10} />
        <View>
          <UploaderText>ConCon Waston</UploaderText>
          <UploaderText>20th June 2021 10:49am</UploaderText>
        </View>
      </Gradient>
    </Container>
  );
};

const Container = styled(Animated.View)`
  flex-direction: column;
  align-items: center;
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
  flex-direction: row;
  align-items: center;
  padding-horizontal: 5%;
  padding-bottom: 20px;
`;

const ImageCaption = styled.Text`
  padding-vertical: 10px;
  padding-horizontal: 10px;
  margin-horizontal: 5%;
  flex-direction: row;
  color: ${props => getContrastingTextColor(props.backgroundColour)};
  ${Typography.h4}
  background-color: ${props => props.backgroundColour};
  ${Outlines.borderRadius};
`;

const UploaderText = styled.Text`
  color: ${Colours.neutral.white};
  text-shadow: 0px 0.25px 0.5px black;
`;

export default ImageGalleryFooter;
