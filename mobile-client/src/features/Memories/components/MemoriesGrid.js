import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import StandardActionButton from 'library/components/StandardActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colours } from 'library/styles';
import { css } from 'styled-components/native';
import { Dimensions } from 'react-native';
import { useRefreshControl } from 'library/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { useDatastore } from 'context';
import QuickPreviewModal from './QuickPreviewModal';
import GridItem from './GridItem';
import MemoryUploader from './MemoryUploader';
import MemoriesGridHeader from './MemoriesGridHeader';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const THUMBNAIL_SIZE = width / NUM_COLUMNS;

const MemoriesGrid = ({ setSelectedAlbum, sendImagesForCaptioning, galleryVisible, savedCaptions, onUpload }) => {
  const modalVisibility = useSharedValue(0);
  const [pressedImage, setPressedImage] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const { memoryAlbums, refetchData } = useDatastore();
  const { renderRefreshControl } = useRefreshControl({ onRefresh: async () => refetchData(), offset: 75 });
  const memories = [...uploads, ...(memoryAlbums || [])];
  const spareSlots = NUM_COLUMNS - (memories.length % NUM_COLUMNS || NUM_COLUMNS);
  const paddedMemories = [
    ...memories,
    ...new Array(spareSlots).fill({}).map((slot, index) => ({ id: `${index * -1 - 1}`, images: [{ spacer: true }] })),
  ];

  useFocusEffect(
    useCallback(() => {
      const refetchMemoriesOnFocus = async () => {
        if (!isFocused) {
          setIsFocused(true);
          await refetchData();
          setUploads([]);
        }
      };
      refetchMemoriesOnFocus();

      return () => {
        if (isFocused) setIsFocused(false);
      };
    }, [isFocused, refetchData]),
  );

  const renderMemory = ({ item: album }) => {
    const { images } = album;
    const [image] = images || [{ _id: album._id }];

    const promises = images?.filter(i => i.promise) || [];
    const uploadPromises = promises.length ? Promise.allSettled(promises) : null;

    if (image.spacer) return <StyledSpacer size={THUMBNAIL_SIZE} />;
    return (
      <GridItem
        image={image}
        isAlbum={images?.length > 1}
        isUpload={!!image.upload}
        uploadPromises={uploadPromises}
        onUploadComplete={() =>
          setUploads(prevUploads =>
            prevUploads.map(u => {
              if (u._id !== album._id) return u;

              return { ...u, images: u.images.map(i => ({ ...i, upload: false })) };
            }),
          )
        }
        size={THUMBNAIL_SIZE}
        onLongPress={() => {
          setPressedImage(image);
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
        refreshControl={renderRefreshControl()}
        keyExtractor={(album, index) => album.images?.[0]?._id || index}
        getItemLayout={(_data, index) => ({ length: THUMBNAIL_SIZE, offset: THUMBNAIL_SIZE * index, index })}
        ListHeaderComponent={<MemoriesGridHeader />}
      />
      <QuickPreviewModal modalVisibility={modalVisibility} image={pressedImage} />
      <StyledActionButton
        label='Show Upload Modal'
        icon={<StyledIcon name='image-plus' size={20} />}
        onPress={() => setShowUploadModal(true)}
        showUploadModal={showUploadModal}
        galleryVisible={galleryVisible}
      />
      {isFocused && (
        <MemoryUploader
          active={showUploadModal}
          onDismiss={() => setShowUploadModal(false)}
          onUploadStart={upload => {
            setUploads([upload, ...uploads]);
            onUpload();
          }}
          sendImagesForCaptioning={sendImagesForCaptioning}
          savedCaptions={savedCaptions}
        />
      )}
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

const StyledSpacer = styled.View`
  flex: ${1 / 3};
  margin: 1px;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

export default MemoriesGrid;
