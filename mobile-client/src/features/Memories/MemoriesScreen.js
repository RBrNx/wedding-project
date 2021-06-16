import { Layout } from 'library/styles';
import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import MemoriesGrid from './components/MemoriesGrid';
import ImageGallery from './components/ImageGallery';

const MemoriesScreen = ({ navigation }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const images = selectedAlbum || [];
  const galleryVisible = !!images.length;

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: !galleryVisible,
    });
  }, [galleryVisible]);

  return (
    <Container>
      <MemoriesGrid setSelectedAlbum={setSelectedAlbum} galleryVisible={galleryVisible} />
      <ImageGallery visible={galleryVisible} images={images} onDismiss={() => setSelectedAlbum(null)} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: ${Layout.statusBarHeight}px;
`;

export default MemoriesScreen;
