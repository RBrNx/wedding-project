import { Ionicons } from '@expo/vector-icons';
import CachedImage from 'library/components/CachedImage';
import React from 'react';
import { Dimensions, Pressable } from 'react-native';
import styled from 'styled-components/native';
import ImageLoader from './ImageLoader';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;

const GalleryItem = ({ image, isAlbum, onPressIn, onPressOut, onLongPress, onPress }) => {
  return (
    <Container>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        onPress={onPress}
        delayLongPress={300}
        pressRetentionOffset={Number.MAX_VALUE}
      >
        <StyledImage source={{ uri: image.thumbnail }} loadingComponent={<ImageLoader />} width={50} />
        {isAlbum && <StyledIcon name='albums' color='#fff' size={18} />}
      </Pressable>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  margin: 1px;
  height: ${width / NUM_COLUMNS}px;
  width: ${width / NUM_COLUMNS}px;
`;

const StyledImage = styled(CachedImage)`
  height: 100%;
  width: 100%;
`;

const StyledIcon = styled(Ionicons)`
  position: absolute;
  top: 5px;
  right: 5px;
  opacity: 0.9;
`;

export default GalleryItem;
