import CachedImage from 'library/components/CachedImage';
import { Layout, Outlines, Theme, Typography } from 'library/styles';
import React, { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import UserAvatar from 'react-native-user-avatar';
import Spacer from 'library/components/Spacer';
import { Image, Platform } from 'react-native';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const QuickPreviewModal = ({ image, modalVisibility }) => {
  const [aspectRatio, setAspectRatio] = useState(0);
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: modalVisibility.value,
  }));
  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: modalVisibility.value }],
  }));

  useEffect(() => {
    if (image)
      Image.getSize(image.url, (width, height) => {
        setAspectRatio(width / height);
      });
  }, [image?.url]);

  return (
    <ModalContainer tint='dark' intensity={100} pointerEvents='none' style={containerAnimatedStyle}>
      <Modal style={modalAnimatedStyle}>
        <Header>
          <UserAvatar size={32} name='Conor Watson' />
          <Spacer size={10} />
          <UserName>Conor Watson</UserName>
        </Header>
        {image && <StyledImage source={{ uri: image?.url }} aspectRatio={aspectRatio} resizeMode='contain' />}
      </Modal>
    </ModalContainer>
  );
};

const ModalContainer = styled(Platform.OS === 'ios' ? AnimatedBlurView : Animated.View)`
  ${Layout.absoluteFill};
  ${Layout.flexCenter};
  background-color: ${Platform.OS === 'ios' ? 'transparent' : 'rgba(0, 0, 0, 0.9)'};
  padding-horizontal: 5%;
`;

const Modal = styled(Animated.View)`
  width: 100%;
  max-height: 90%;
  background-color: ${Theme.card};
  overflow: hidden;
  ${Outlines.boxShadow};
  ${Outlines.borderRadius};
`;

const Header = styled.View`
  padding: 8px;
  flex-direction: row;
  align-items: center;
`;

const UserName = styled.Text`
  ${Typography.regularFont}
  color: ${Theme.headerTextColour};
`;

const StyledImage = styled(CachedImage)`
  aspect-ratio: ${props => props.aspectRatio};
`;

export default QuickPreviewModal;
