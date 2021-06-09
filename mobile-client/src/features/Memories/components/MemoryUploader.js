import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import BottomSheetModal from 'library/components/BottomSheetModal';
import { Colours, Layout, Theme } from 'library/styles';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';
import { Dimensions } from 'react-native';
import StandardPressable from 'library/components/StandardPressable';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import theme from 'styled-theming';
import StandardActionButton from 'library/components/StandardActionButton';
import { AntDesign } from '@expo/vector-icons';

const NUM_COLUMNS = 3;
const MIN_TIME = 750;
const { width } = Dimensions.get('window');

const MemoryUploader = ({ active, onDismiss }) => {
  const [_hasPermission, setHasPermission] = useState(null);
  const [assets, setAssets] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [lastAssetId, setLastAssetId] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const sheetPosition = useSharedValue(0);
  const opacityBounce = useSharedValue(0);
  const uploadButtonVisible = useSharedValue(0);
  const uploadButtonVisibility = useDerivedValue(() => {
    if (uploadButtonVisible.value === 1) return sheetPosition.value;
    return uploadButtonVisible.value;
  });
  const folderSelectorVisible = useSharedValue(1);
  const folderSelectorVisibilty = useDerivedValue(() => {
    if (folderSelectorVisible.value === 1) return sheetPosition.value;
    return folderSelectorVisible.value;
  });

  const folderSelectorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(folderSelectorVisibilty.value, [0, 1], [50, 0], Extrapolate.CLAMP) }],
  }));

  const flatlistAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacityBounce.value, [0, 0.5, 1], [1, 0, 1], Extrapolate.CLAMP),
  }));

  const uploadButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(uploadButtonVisibility.value, [0, 1], [0, 1], Extrapolate.CLAMP),
    transform: [{ scale: interpolate(uploadButtonVisibility.value, [0, 1], [0, 1], Extrapolate.CLAMP) }],
  }));

  const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const loadMoreAssets = async () => {
    if (lastAssetId) {
      const { assets: moreAssets, endCursor, hasNextPage } = await MediaLibrary.getAssetsAsync({
        first: 50,
        album: selectedFolder,
        after: lastAssetId,
      });

      const newAssets = [...assets.filter(a => a.uri), ...moreAssets];
      const spareSlots = NUM_COLUMNS - (newAssets.length % NUM_COLUMNS);
      setAssets([...newAssets, ...new Array(spareSlots).fill({}).map((slot, index) => ({ id: `${index * -1 - 1}` }))]);
      setLastAssetId(hasNextPage ? endCursor : null);
    }
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
    const loadAssets = async () => {
      const startTime = Date.now();
      const { assets: localAssets, endCursor, hasNextPage } = await MediaLibrary.getAssetsAsync({
        first: 50,
        album: selectedFolder,
      });
      const spareSlots = NUM_COLUMNS - (localAssets.length % NUM_COLUMNS);
      const timeDiff = Date.now() - startTime;
      if (timeDiff < MIN_TIME) await new Promise(r => setTimeout(r, MIN_TIME - timeDiff));
      setAssets([
        ...localAssets,
        ...new Array(spareSlots).fill({}).map((slot, index) => ({ id: `${index * -1 - 1}` })),
      ]);
      setLastAssetId(hasNextPage ? endCursor : null);
    };

    loadAssets();
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
            icon={<StyledIcon name='clouduploado' size={22} />}
            containerStyle={{ zIndex: 99 }}
            style={uploadButtonAnimatedStyle}
          />
        }
      >
        <StyledBottomSheetFlatList
          data={assets}
          numColumns={NUM_COLUMNS}
          renderItem={renderItem}
          initialNumToRender={20}
          onEndReached={loadMoreAssets}
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
