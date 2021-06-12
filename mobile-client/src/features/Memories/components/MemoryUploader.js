import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import BottomSheetModal from 'library/components/BottomSheetModal';
import { Colours, Layout, Theme } from 'library/styles';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';
import { ActivityIndicator, Dimensions } from 'react-native';
import StandardPressable from 'library/components/StandardPressable';
import Animated, { Easing, withTiming } from 'react-native-reanimated';
import theme from 'styled-theming';
import StandardActionButton from 'library/components/StandardActionButton';
import { AntDesign } from '@expo/vector-icons';
import awsSigV4Fetch from 'library/utils/awsSigV4Fetch';
import { extensionToMimeType } from 'library/utils/mimetypes';
import Constants from 'expo-constants';
import { useAlert } from 'context';
import { AlertType } from 'library/enums';
import parseError from 'library/utils/parseError';
import axios from 'axios';
import RNBlob from 'library/components/RNBlob';
import { useMemoryUploader } from 'library/hooks';

const { BASE_API_URL } = Constants.manifest.extra;
const NUM_COLUMNS = 3;
const { width } = Dimensions.get('window');

const MemoryUploader = ({ active, onDismiss, onUploadStart }) => {
  const [_hasPermission, setHasPermission] = useState(null);
  const [assets, setAssets] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [lastAssetId, setLastAssetId] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { showAlert } = useAlert();
  const {
    sheetPosition,
    opacityBounce,
    uploadButtonVisible,
    folderSelectorVisible,
    folderSelectorAnimatedStyle,
    uploadButtonAnimatedStyle,
    flatlistAnimatedStyle,
  } = useMemoryUploader();

  const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const getBlob = async uri => {
    const res = await fetch(uri);
    const blob = await res.blob();

    // Axios doesn't support Blob in RN correctly, so we use our own wrapper
    // https://github.com/axios/axios/issues/2677
    return new RNBlob([blob]);
  };

  const uploadImages = async () => {
    try {
      setUploading(true);
      const body = selectedAssets.map(a => {
        const [_filePath, extension] = a.uri.split('.');
        return { contentType: extensionToMimeType(extension) };
      });
      const initiateUploadResponse = await awsSigV4Fetch(`${BASE_API_URL}initiateUpload`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const uploadRequests = await initiateUploadResponse.json();

      const albumUpload = {
        images: await Promise.all(
          uploadRequests.map(async (request, index) => {
            const { photoId, s3PutObjectUrl } = request;
            const { uri } = selectedAssets[index];
            const { contentType } = body[index];
            const fileBlob = await getBlob(uri);

            return {
              _id: photoId,
              url: uri,
              thumbnail: uri,
              upload: true,
              promise: axios.put(s3PutObjectUrl, fileBlob, {
                headers: {
                  'Content-Type': contentType,
                  'Cache-Control': 'max-age=31557600',
                },
              }),
            };
          }),
        ),
      };

      onUploadStart(albumUpload);

      setTimeout(() => {
        onDismiss();
        setUploading(false);
      }, 1000);
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
    setAssets([
      ...newAssets,
      ...(hasNextPage
        ? []
        : new Array(spareSlots).fill({}).map((slot, index) => ({ id: `${index * -1 - 1}`, spacer: true }))),
    ]);
    setLastAssetId(hasNextPage ? endCursor : null);
  };

  useEffect(() => {
    const initialise = async () => {
      await requestMediaLibraryPermission();
      const albums = await MediaLibrary.getAlbumsAsync();
      setFolders([
        { id: null, title: 'All Photos' },
        ...albums.filter(a => a.assetCount > 0).sort((a, b) => a.title.localeCompare(b.title)),
      ]);
    };

    initialise();
  }, []);

  useEffect(() => {
    setTimeout(() => getAssets(), 750);
  }, [selectedFolder]);

  const renderItem = ({ item: asset }) => {
    const isSelected = selectedAssets.some(a => a.id === asset.id);

    return (
      <Container>
        <StyledImage source={{ uri: asset.uri }} />
        <SelectorIcon
          isSelected={isSelected}
          onPress={() => {
            if (!isSelected) {
              setSelectedAssets([...selectedAssets, asset]);
              uploadButtonVisible.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) });
              folderSelectorVisible.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.exp) });
            } else {
              const updatedAssets = selectedAssets.filter(a => a.id !== asset.id);
              setSelectedAssets(updatedAssets);
              if (!updatedAssets.length) {
                uploadButtonVisible.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.exp) });
                folderSelectorVisible.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) });
              }
            }
          }}
        >
          {isSelected && <SelectedIndex>{selectedAssets.findIndex(a => a.id === asset.id) + 1}</SelectedIndex>}
        </SelectorIcon>
      </Container>
    );
  };

  const renderFolder = ({ item: folder }) => {
    const { id, title } = folder;
    const isSelected = selectedFolder === id;

    return (
      <Folder
        isSelected={isSelected}
        onPress={() => {
          setSelectedFolder(id);
          opacityBounce.value = withTiming(0.5, { duration: 1000, easing: Easing.out(Easing.exp) }, () => {
            opacityBounce.value = withTiming(1, { duration: 750, easing: Easing.out(Easing.exp) });
          });
        }}
      >
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
          initialNumToRender={20}
        />
      </ListContainer>
      <BottomSheetModal
        active={active}
        onDismiss={onDismiss}
        animatedIndex={sheetPosition}
        outerChildren={
          <StandardActionButton
            label='Edit RSVP'
            icon={uploading ? <ActivityIndicator color='#fff' /> : <StyledIcon name='clouduploado' size={22} />}
            containerStyle={{ zIndex: 99 }}
            style={uploadButtonAnimatedStyle}
            onPress={uploadImages}
          />
        }
      >
        <StyledBottomSheetFlatList
          data={assets}
          numColumns={NUM_COLUMNS}
          renderItem={renderItem}
          initialNumToRender={20}
          onEndReached={() => getAssets({ onEndReached: true })}
          onEndReachedThreshold={1}
          style={flatlistAnimatedStyle}
        />
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
`;

const StyledIcon = styled(AntDesign)`
  color: ${Colours.neutral.white};
`;

const FolderList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: '2%',
  },
}))``;

const Folder = styled(StandardPressable)`
  min-width: 50px;
  height: 35px;
  border-radius: 50px;
  border: 2px solid ${FolderColour};
  margin-horizontal: 5px;
  padding: 10px;
  background-color: ${props => (props.isSelected ? FolderColour : 'transparent')};
  ${Layout.flexCenter}
`;

const FolderName = styled.Text`
  color: ${props => (props.isSelected ? Theme.background(props) : FolderColour)};
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

const Container = styled.View`
  flex: ${1 / NUM_COLUMNS - 6 / width / 100};
  margin: 3px;
  height: ${width / NUM_COLUMNS}px;
  width: ${width / NUM_COLUMNS}px;
`;

const SelectorIcon = styled(StandardPressable)`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  border: 1.5px solid ${props => (props.isSelected ? Colours.secondary : 'white')};
  background-color: ${props => (props.isSelected ? Colours.secondary : 'transparent')};
  ${Layout.flexCenter}
`;

const SelectedIndex = styled.Text`
  color: ${Colours.neutral.white};
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export default MemoryUploader;
