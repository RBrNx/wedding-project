import { Layout } from 'library/styles';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Portal } from '@gorhom/portal';
import MemoriesGrid from './components/MemoriesGrid';
import ImageGallery from './components/ImageGallery';

const MemoriesScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [imagesForUpload, setImagesForUpload] = useState(null);
  const [savedCaptions, setSavedCaptions] = useState(null);
  const images = selectedAlbum || imagesForUpload || [];
  const galleryVisible = !!images.length;

  return (
    <Container>
      <MemoriesGrid
        setSelectedAlbum={setSelectedAlbum}
        sendImagesForCaptioning={setImagesForUpload}
        galleryVisible={galleryVisible}
        savedCaptions={savedCaptions}
        onUpload={() => {
          setSavedCaptions(null);
          setImagesForUpload(null);
        }}
      />
      <Portal>
        <ImageGallery
          visible={galleryVisible}
          images={images}
          captionMode={!!imagesForUpload?.length}
          onCaptionSubmit={captions => {
            setSavedCaptions(captions);
          }}
          onDismiss={() => {
            setSelectedAlbum(null);
            setImagesForUpload(null);
          }}
        />
      </Portal>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: ${Layout.statusBarHeight}px;
`;

export default MemoriesScreen;
