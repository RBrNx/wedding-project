import { useQuery } from '@apollo/react-hooks';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import React, { useState } from 'react';
import styled from 'styled-components';
import GET_MEMORIES from 'library/graphql/queries/getMemories.graphql';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import ImageModal from './ImageModal';
import GalleryItem from './GalleryItem';

const NUM_COLUMNS = 3;
const loadingData = new Array(30).fill(null).map((_, index) => ({ id: index, isLoading: true }));

const Gallery = () => {
  const modalVisibility = useSharedValue(0);
  const [pressedImage, setPressedImage] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { data, loading } = useQuery(GET_MEMORIES, { variables: { filter: { page: 0, limit: 30 } } });
  const memories = loading ? loadingData : data?.getMemories;

  const renderGalleryItem = ({ item: image, index }) => {
    const { isLoading } = image;

    return (
      <GalleryItem
        key={index}
        isLoading={isLoading}
        image={image}
        modalVisibility={modalVisibility}
        setPressedImage={setPressedImage}
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
        ListHeaderComponent={<DashboardHeader title='Memories' style={{ paddingHorizontal: '5%', marginBottom: 15 }} />}
      />
      <ImageModal modalVisibility={modalVisibility} image={pressedImage} />
    </>
  );
};

const StyledFlatlist = styled.FlatList`
  flex: 1;
`;

export default Gallery;
