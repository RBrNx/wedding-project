import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { Colours } from 'library/styles';

const ImageGalleryHeader = ({ headerFooterVisible, index, imageCount, onDismiss }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: headerFooterVisible.value,
  }));

  return (
    <Container style={animatedStyle}>
      <CloseIcon name='close-outline' size={32} color={Colours.neutral.white} onPress={onDismiss} />
      <ImageCount>
        {index + 1} of {imageCount}
      </ImageCount>
    </Container>
  );
};

const Container = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 35px;
  padding-horizontal: 0px;
  z-index: 99;
`;

const CloseIcon = styled(Ionicons)`
  padding-right: 10px;
  padding-left: 10px;
`;

const ImageCount = styled.Text`
  padding-horizontal: 10px;
  padding-vertical: 2px;
  flex-direction: row;
  color: ${Colours.neutral.white};
  background-color: ${Colours.neutral.grey4};
  border-radius: 20px;
  margin-right: 10px;
`;

export default ImageGalleryHeader;
