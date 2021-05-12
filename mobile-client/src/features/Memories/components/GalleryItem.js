import CachedImage from 'library/components/CachedImage';
import React from 'react';
import { Dimensions, Pressable } from 'react-native';
import styled from 'styled-components/native';
import ImageLoader from './ImageLoader';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;

const GalleryItem = ({ image, onPressIn, onPressOut, onLongPress }) => {
  return (
    <Container>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        delayLongPress={300}
        pressRetentionOffset={Number.MAX_VALUE}
      >
        <StyledImage cacheKey={`${image.id}`} source={{ uri: image.downloadUrl }} loadingComponent={<ImageLoader />} />
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

export default GalleryItem;
