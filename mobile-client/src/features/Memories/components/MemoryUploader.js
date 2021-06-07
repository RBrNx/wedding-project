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
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import theme from 'styled-theming';

const NUM_COLUMNS = 3;
const MIN_TIME = 750;
const { width } = Dimensions.get('window');

const MemoryUploader = ({ active, onDismiss }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [assets, setAssets] = useState([]);
  const [folders, setFolders] = useState([{ id: null, title: 'All Photos' }]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const x = useSharedValue(0);
  const opacityBounce = useSharedValue(0);

  const folderSelectorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(x.value, [0, 1], [50, 0], Extrapolate.CLAMP) }],
  }));

  const flatlistAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacityBounce.value, [0, 0.5, 1], [1, 0, 1], Extrapolate.CLAMP),
  }));

  const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    const initialise = async () => {
      await requestMediaLibraryPermission();
      const albums = await MediaLibrary.getAlbumsAsync();
      setFolders([...folders, ...albums.sort((a, b) => a.title.localeCompare(b.title))]);
    };

    initialise();
  }, []);

  useEffect(() => {
    const loadAssets = async () => {
      const startTime = Date.now();
      const { assets: localAssets } = await MediaLibrary.getAssetsAsync({ first: 50, album: selectedFolder });
      const spareSlots = NUM_COLUMNS - (localAssets.length % NUM_COLUMNS);
      const timeDiff = Date.now() - startTime;
      if (timeDiff < MIN_TIME) await new Promise(r => setTimeout(r, MIN_TIME - timeDiff));
      setAssets([
        ...localAssets,
        ...new Array(spareSlots).fill({}).map((slot, index) => ({ id: `${index * -1 - 1}` })),
      ]);
    };

    loadAssets();
  }, [selectedFolder]);

  const renderItem = ({ item: asset }) => {
    return (
      <Container>
        <StyledImage source={{ uri: asset.uri }} />
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
            // runOnJS(setSelectedFolder)(id);
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
      <BottomSheetModal active={active} onDismiss={onDismiss} animatedIndex={x}>
        <StyledBottomSheetFlatList
          data={assets}
          numColumns={NUM_COLUMNS}
          renderItem={renderItem}
          initialNumToRender={20}
          onEndReached={() => console.log('end')}
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

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export default MemoryUploader;
