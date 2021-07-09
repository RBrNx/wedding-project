import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import BottomSheetModal from 'library/components/BottomSheetModal';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';
import { ActivityIndicator, Dimensions, Linking } from 'react-native';
import StandardPressable from 'library/components/StandardPressable';
import Animated, { Easing, withTiming } from 'react-native-reanimated';
import theme from 'styled-theming';
import StandardActionButton from 'library/components/StandardActionButton';
import { AntDesign } from '@expo/vector-icons';
import awsSigV4Fetch from 'library/utils/awsSigV4Fetch';
import { extensionToMimeType } from 'library/utils/mimetypes';
import Constants from 'expo-constants';
import { useAlert, useAuth } from 'context';
import { AlertType } from 'library/enums';
import parseError from 'library/utils/parseError';
import { useMemoryUploader } from 'library/hooks';
import wretch from 'wretch';
import StandardButton from 'library/components/StandardButton';
import { nanoid } from 'nanoid';
import MemoryUploaderThumbnail from './MemoryUploaderThumbnail';
import { getBlob } from '../helpers';
import ImageAnimation from './ImageAnimation';

const { width } = Dimensions.get('window');
const { BASE_API_URL } = Constants.manifest.extra;
const NUM_COLUMNS = 3;
const THUMBNAIL_SIZE = width / NUM_COLUMNS;

const MemoryUploader = ({ active, onDismiss, onUploadStart, sendImagesForCaptioning, savedCaptions }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [assets, setAssets] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [lastAssetId, setLastAssetId] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useAuth();
  const { showAlert } = useAlert();
  const {
    sheetPosition,
    opacityBounce,
    folderSelectorAnimatedStyle,
    uploadButtonAnimatedStyle,
    flatlistAnimatedStyle,
    resetAnimatedValues,
  } = useMemoryUploader({ selectedAssets });

  const requestMediaLibraryPermission = async manuallyTriggered => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'denied' && manuallyTriggered) Linking.openSettings();

    return status === 'granted';
  };

  const uploadImages = async assetsToUpload => {
    try {
      setUploading(true);
      const body = assetsToUpload.map((asset, index) => {
        const extension = new URL(asset.uri).pathname.split('.').pop();
        return {
          contentType: extensionToMimeType(extension),
          sortIndex: index.toString(),
          ...(asset.caption && { caption: encodeURIComponent(asset.caption) }),
          uploadedBy: currentUser._id,
        };
      });
      const initiateUploadResponse = await awsSigV4Fetch(`${BASE_API_URL}initiateUpload`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const uploadRequests = await initiateUploadResponse.json();

      if (!Array.isArray(uploadRequests)) {
        throw new Error(uploadRequests.message);
      }

      const albumUpload = {
        _id: `upload-${nanoid()}`,
        images: await Promise.all(
          uploadRequests.map(async (request, index) => {
            const { photoId, s3PutObjectUrl } = request;
            const { uri } = selectedAssets[index];
            const { contentType, sortIndex, caption } = body[index];
            const { firstName, lastName } = currentUser;
            const fileBlob = await getBlob(uri);

            return {
              _id: photoId,
              url: uri,
              thumbnail: uri,
              sortIndex,
              caption,
              uploadedBy: { firstName, lastName },
              createdAt: new Date(),
              upload: true,
              promise: wretch(s3PutObjectUrl, {
                headers: {
                  'Content-Type': contentType,
                  'Cache-Control': 'max-age=31557600',
                },
              }).put(fileBlob),
            };
          }),
        ),
      };

      onUploadStart(albumUpload);
      setTimeout(() => onSheetDismiss(), 100);
    } catch (err) {
      setUploading(false);
      const { message } = parseError(err);
      console.error(message);
      showAlert({
        message,
        type: AlertType.WARNING,
      });
    }
  };

  const getAssets = async ({ onEndReached } = {}) => {
    if (onEndReached && !lastAssetId) return;

    const { assets: moreAssets, endCursor, hasNextPage } = await MediaLibrary.getAssetsAsync({
      first: 50,
      album: selectedFolder,
      ...(lastAssetId && { after: lastAssetId }),
      sortBy: MediaLibrary.SortBy.modificationTime,
    });

    const newAssets = [...(onEndReached ? assets : []), ...moreAssets];
    const spareSlots = NUM_COLUMNS - (newAssets.length % NUM_COLUMNS);
    opacityBounce.value = withTiming(0.5, { duration: 1000, easing: Easing.out(Easing.exp) });
    setAssets([
      ...newAssets,
      ...(hasNextPage
        ? []
        : new Array(spareSlots).fill({}).map((slot, index) => ({ id: `${index * -1 - 1}`, spacer: true }))),
    ]);
    setLastAssetId(hasNextPage ? endCursor : null);
    opacityBounce.value = withTiming(1, { duration: 750, easing: Easing.out(Easing.exp) }, () => {
      opacityBounce.value = 0;
    });
  };

  useEffect(() => {
    requestMediaLibraryPermission();
  }, []);

  useEffect(() => {
    const initialise = async () => {
      const albums = await MediaLibrary.getAlbumsAsync();
      setFolders([
        { id: null, title: 'All Photos' },
        ...albums.filter(a => a.assetCount > 0).sort((a, b) => a.title.localeCompare(b.title)),
      ]);
    };

    if (hasPermission) {
      initialise();
    }
  }, [hasPermission]);

  useEffect(() => {
    if (hasPermission) {
      getAssets();
    }
  }, [selectedFolder, hasPermission]);

  useEffect(() => {
    if (savedCaptions) {
      const captionedAssets = selectedAssets.map((asset, index) => ({ ...asset, caption: savedCaptions[index] }));
      uploadImages(captionedAssets);
    }
  }, [savedCaptions]);

  const onSheetDismiss = () => {
    setUploading(false);
    setSelectedFolder(null);
    setLastAssetId(null);
    setSelectedAssets([]);
    resetAnimatedValues();
    onDismiss();
  };

  const changeSelectedFolder = folderId => {
    setLastAssetId(null);
    setSelectedFolder(folderId);
  };

  const onThumbnailSelect = (selectedAsset, isSelected) => {
    if (!isSelected) {
      setSelectedAssets(previousAssets => [...previousAssets, selectedAsset]);
    } else {
      setSelectedAssets(previousAssets => previousAssets.filter(a => a.id !== selectedAsset.id));
    }
  };

  const renderThumbnail = ({ item: asset }) => {
    const selectedAssetIndex = selectedAssets.findIndex(a => a.id === asset.id) + 1;
    const isSelected = selectedAssetIndex > 0;

    if (asset.spacer) return <StyledSpacer size={THUMBNAIL_SIZE} />;
    return (
      <MemoryUploaderThumbnail
        asset={asset}
        size={THUMBNAIL_SIZE}
        isSelected={isSelected}
        selectedAssetIndex={selectedAssetIndex}
        onThumbnailSelect={onThumbnailSelect}
      />
    );
  };

  const renderFolder = ({ item: folder }) => {
    const { id, title } = folder;
    const isSelected = selectedFolder === id;

    return (
      <Folder isSelected={isSelected} onPress={() => changeSelectedFolder(id)}>
        <FolderName isSelected={isSelected}>{title}</FolderName>
      </Folder>
    );
  };

  return (
    <>
      <ListContainer style={folderSelectorAnimatedStyle}>
        <FolderList
          data={folders}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderFolder}
          keyExtractor={item => item.id}
          initialNumToRender={10}
        />
      </ListContainer>
      <BottomSheetModal
        active={active}
        onDismiss={onSheetDismiss}
        animatedIndex={sheetPosition}
        outerChildren={
          <StandardActionButton
            label='Upload Images'
            icon={uploading ? <ActivityIndicator color='#fff' /> : <StyledIcon name='clouduploado' size={22} />}
            containerStyle={{ zIndex: 99 }}
            style={uploadButtonAnimatedStyle}
            onPress={() => {
              sendImagesForCaptioning(selectedAssets);
            }}
          />
        }
      >
        {active && (
          <StyledBottomSheetFlatList
            data={assets}
            numColumns={NUM_COLUMNS}
            renderItem={renderThumbnail}
            initialNumToRender={20}
            onEndReached={() => getAssets({ onEndReached: true })}
            onEndReachedThreshold={1}
            getItemLayout={(data, index) => ({ length: THUMBNAIL_SIZE, offset: THUMBNAIL_SIZE * index, index })}
            style={flatlistAnimatedStyle}
            ListHeaderComponent={<ModalHeader>Share a memory</ModalHeader>}
          />
        )}
        {!hasPermission && (
          <PermissionCard pointerEvents='box-none'>
            <PermissionText>To upload a memory, we require your permission to access your local images</PermissionText>
            <ImageAnimation size={150} />
            <StandardButton text='Grant Permission' raised onPress={() => requestMediaLibraryPermission(true)} />
          </PermissionCard>
        )}
      </BottomSheetModal>
    </>
  );
};

const FolderColour = theme('theme', {
  light: 'grey',
  dark: Colours.neutral.grey3,
});

const ListContainer = styled(Animated.View)`
  height: 50px;
  position: absolute;
  bottom: 0;
  z-index: 1;
  background-color: ${Theme.background};
  width: 100%;
`;

const FolderList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: '2%',
  },
}))``;

const Folder = styled(StandardPressable)`
  min-width: 50px;
  border-radius: 50px;
  border: 2px solid ${FolderColour};
  margin-horizontal: 5px;
  background-color: ${props => (props.isSelected ? FolderColour : 'transparent')};
  ${Layout.flexCenter}
`;

const FolderName = styled.Text`
  color: ${props => (props.isSelected ? Theme.background(props) : FolderColour)};
  padding-horizontal: 10px;
  padding-vertical: 8px;
`;

const StyledIcon = styled(AntDesign)`
  color: ${Colours.neutral.white};
`;

const PermissionCard = styled(Animated.View)`
  position: absolute;
  width: 90%;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  height: 300px;
  left: 5%;
  top: 7.5%;
`;

const PermissionText = styled.Text`
  text-align: center;
  color: ${Theme.detailTextColour};
`;

const StyledBottomSheetFlatList = styled(BottomSheetFlatList).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 3,
    paddingBottom: 50,
  },
  columnWrapperStyle: {
    flex: 1,
  },
}))`
  flex: 1;
`;

const StyledSpacer = styled.View`
  flex: ${1 / 3};
  margin: 3px;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

const ModalHeader = styled.Text`
  ${Typography.h3};
  color: ${Theme.headerTextColour};
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`;

export default MemoryUploader;
