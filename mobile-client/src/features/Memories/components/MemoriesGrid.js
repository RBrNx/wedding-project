import { useQuery } from '@apollo/react-hooks';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import React, { useState } from 'react';
import styled from 'styled-components';
import GET_MEMORY_ALBUMS from 'library/graphql/queries/getMemoryAlbums.graphql';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import StandardActionButton from 'library/components/StandardActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colours } from 'library/styles';
import { css } from 'styled-components/native';
import Spacer from 'library/components/Spacer';
import QuickPreviewModal from './QuickPreviewModal';
import GridItem from './GridItem';
import MemoryUploader from './MemoryUploader';

const NUM_COLUMNS = 3;
const loadingData = new Array(30).fill(null).map((_, _id) => ({ _id }));

const MemoriesGrid = ({ setSelectedAlbum, galleryVisible }) => {
  const modalVisibility = useSharedValue(0);
  const [pressedImage, setPressedImage] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploads, setUploads] = useState([]);
  const { data, loading } = useQuery(GET_MEMORY_ALBUMS, { variables: { filter: { page: 0, limit: 60 } } });
  const memories = loading ? loadingData : [...uploads, ...data?.getMemoryAlbums];
  const spareSlots = NUM_COLUMNS - (memories.length % NUM_COLUMNS || NUM_COLUMNS);
  const paddedMemories = [
    ...memories,
    ...new Array(spareSlots).fill({}).map((slot, index) => ({ id: `${index * -1 - 1}`, images: [{ spacer: true }] })),
  ];

  const renderMemory = ({ item: album, index }) => {
    const { images } = album;
    const [image] = images || [{ _id: album._id }];

    const uploadPromises = Promise.allSettled(images?.map(i => i.promise) || []);

    if (image.spacer) return <StyledSpacer key={image._id || index} flex />;
    return (
      <GridItem
        key={image._id || index}
        image={image}
        isAlbum={images?.length > 1}
        isUpload={!!image.upload}
        uploadPromises={uploadPromises}
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
        data={paddedMemories}
        numColumns={NUM_COLUMNS}
        renderItem={renderMemory}
        scrollEnabled={scrollEnabled}
        initialNumToRender={50}
        keyExtractor={(album, index) => {
          return album.images?.[0]?._id || index;
        }}
        ListHeaderComponent={<DashboardHeader title='Memories' style={{ paddingHorizontal: '5%', marginBottom: 10 }} />}
      />
      <QuickPreviewModal modalVisibility={modalVisibility} image={pressedImage} />
      <StyledActionButton
        label='Show Upload Modal'
        icon={<StyledIcon name='image-plus' size={20} />}
        onPress={() => setShowUploadModal(true)}
        showUploadModal={showUploadModal}
        galleryVisible={galleryVisible}
      />
      <MemoryUploader
        active={showUploadModal}
        onDismiss={() => setShowUploadModal(false)}
        onUploadStart={upload => setUploads([upload, ...uploads])}
      />
    </>
  );
};

const StyledFlatlist = styled.FlatList`
  flex: 1;
`;

const StyledIcon = styled(MaterialCommunityIcons)`
  color: ${Colours.neutral.white};
`;

const StyledActionButton = styled(StandardActionButton)`
  ${props =>
    (props.showUploadModal || props.galleryVisible) &&
    css`
      elevation: 0;
    `}
`;

const StyledSpacer = styled(Spacer)`
  margin: 1px;
`;

export default MemoriesGrid;
