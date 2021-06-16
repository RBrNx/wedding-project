import { Ionicons } from '@expo/vector-icons';
import CachedImage from 'library/components/CachedImage';
import { Layout } from 'library/styles';
import React, { useState } from 'react';

import { ActivityIndicator, Pressable } from 'react-native';
import styled from 'styled-components/native';
import ImageLoader from './ImageLoader';

const GridItem = React.memo(
  ({ image, isAlbum, isUpload, size, uploadPromises, onPressIn, onPressOut, onLongPress, onPress }) => {
    const [isPending, setIsPending] = useState(!!isUpload);

    if (isUpload) uploadPromises.then(() => setTimeout(() => setIsPending(false), 3000));

    return (
      <Container size={size}>
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
        {isPending && (
          <LoadingView>
            <ActivityIndicator color='#fff' />
          </LoadingView>
        )}
      </Container>
    );
  },
);

const Container = styled.View`
  flex: 1;
  margin: 1px;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
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

const LoadingView = styled.View`
  background-color: 'rgba(0, 0, 0, 0.5)';
  ${Layout.absoluteFill};
  ${Layout.flexCenter};
`;

export default GridItem;
