import { Layout } from 'library/styles';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import GalleryGrid from './components/GalleryGrid';
import ImageGallery from './components/ImageGallery';

const MemoriesScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = selectedImage ? [selectedImage] : [];

  return (
    <Container>
      <GalleryGrid setSelectedImage={image => setSelectedImage(image)} />
      <ImageGallery visible={images.length} images={images} onDismiss={() => setSelectedImage(null)} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: ${Layout.statusBarHeight}px;
`;

export default MemoriesScreen;
