import { Layout } from 'library/styles';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Portal } from '@gorhom/portal';
import MemoriesGrid from './components/MemoriesGrid';
import ImageGallery from './components/ImageGallery';

const MemoriesScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const images = selectedAlbum || [];
  const galleryVisible = !!images.length;

  return (
    <Container>
      <MemoriesGrid setSelectedAlbum={setSelectedAlbum} galleryVisible={galleryVisible} />
      <Portal>
        <ImageGallery visible={galleryVisible} images={images} onDismiss={() => setSelectedAlbum(null)} />
      </Portal>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: ${Layout.statusBarHeight}px;
`;

export default MemoriesScreen;
