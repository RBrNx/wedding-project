import { useQuery } from '@apollo/react-hooks';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import React, { useState } from 'react';
import styled from 'styled-components';
import GET_MEMORY_ALBUMS from 'library/graphql/queries/getMemoryAlbums.graphql';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import ImageModal from './ImageModal';
import GalleryItem from './GalleryItem';

const NUM_COLUMNS = 3;
const loadingData = new Array(30).fill(null).map((_, _id) => ({ _id }));

const GalleryGrid = ({ setSelectedAlbum }) => {
  const modalVisibility = useSharedValue(0);
  const [pressedImage, setPressedImage] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { data, loading } = useQuery(GET_MEMORY_ALBUMS, { variables: { filter: { page: 0, limit: 60 } } });
  const memories = loading ? loadingData : data?.getMemoryAlbums;

  const renderGalleryItem = ({ item: album, index }) => {
    const { images } = album;
    const [image] = images || [{ _id: album._id }];

    return (
      <GalleryItem
        key={index}
        image={image}
        isAlbum={images?.length > 1}
        unstable_pressDelay={400}
        onPressIn={() => setPressedImage(image)}
        onLongPress={() => {
          setScrollEnabled(false);
          modalVisibility.value = withSpring(1, { damping: 9.075, mass: 0.5 });
        }}
        onPressOut={() => {
          setTimeout(() => setPressedImage(null), 150);
          setScrollEnabled(true);
          modalVisibility.value = withSpring(0);
        }}
        onPress={() => setSelectedAlbum(images)}
      />
    );
  };

  return (
    <>
      <StyledFlatlist
        data={memories}
        numColumns={NUM_COLUMNS}
        renderItem={renderGalleryItem}
        scrollEnabled={scrollEnabled}
        initialNumToRender={20}
        keyExtractor={(album, index) => {
          return album.images?.[0]?._id || index;
        }}
        ListHeaderComponent={<DashboardHeader title='Memories' style={{ paddingHorizontal: '5%', marginBottom: 10 }} />}
      />
      <ImageModal modalVisibility={modalVisibility} image={pressedImage} />
    </>
  );
};

const StyledFlatlist = styled.FlatList`
  flex: 1;
`;

export default GalleryGrid;
