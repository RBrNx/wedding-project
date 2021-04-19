import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Colours, Theme } from 'library/styles';
import ListHandle from 'library/components/ListHandle';
import { BottomSheet } from 'library/utils/constants';
import useCustomScrollbar from '../hooks/useCustomScrollbar';
import CustomScrollbar from './CustomScrollbar';

const { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE } = BottomSheet;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const BottomSheetFlatList = ({ data, onRefresh, onScroll, renderItem, ListEmptyComponent, ListFooterComponent }) => {
  const scrollY = useSharedValue(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFlatlistEmpty = !data?.length;

  const {
    setTotalScrollbarHeight,
    setVisibleScrollbarHeight,
    animatedHandleStyle,
    scrollbarHandleSize,
    scrollbarOpacity,
    showScrollbar,
    hideScrollbar,
  } = useCustomScrollbar(scrollY);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
    if (onScroll) onScroll(event);
  });

  const animatedHandleContainerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -HEADER_SCROLL_DISTANCE],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateY }],
    };
  });

  const animatedScrollbarStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateY }],
      opacity: scrollbarOpacity.value,
    };
  });

  const renderListHandle = () => {
    return <ListHandle animatedHandleContainerStyle={animatedHandleContainerStyle} />;
  };

  const renderRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={isRefreshing}
        progressViewOffset={HEADER_MAX_HEIGHT + 15}
        onRefresh={async () => {
          setIsRefreshing(true);
          await onRefresh();
          setIsRefreshing(false);
        }}
        progressBackgroundColor={Colours.primary}
        colors={[Colours.neutral.white]}
        tintColor={Colours.primary}
      />
    );
  };

  return (
    <FlatListContainer>
      <StyledAnimatedFlatList
        isFlatlistEmpty={isFlatlistEmpty}
        scrollEventThrottle={1}
        onScroll={scrollHandler}
        renderItem={renderItem}
        data={data}
        keyExtractor={item => item._id}
        initialNumToRender={20}
        ListHeaderComponent={renderListHandle}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        stickyHeaderIndices={[0]}
        refreshControl={renderRefreshControl()}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(contentWidth, contentHeight) => {
          setTotalScrollbarHeight(contentHeight);
        }}
        onLayout={e => {
          setVisibleScrollbarHeight(e.nativeEvent.layout.height);
        }}
        onScrollBeginDrag={showScrollbar}
        onMomentumScrollEnd={hideScrollbar}
        scrollEnabled={!isFlatlistEmpty}
        overScrollMode='never'
        bounces={false}
      />
      <CustomScrollbar
        handleSize={scrollbarHandleSize - HEADER_MIN_HEIGHT}
        animatedHandleStyle={animatedHandleStyle}
        style={animatedScrollbarStyle}
      />
    </FlatListContainer>
  );
};

const FlatListContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const StyledAnimatedFlatList = styled(AnimatedFlatList).attrs(props => ({
  contentContainerStyle: {
    marginTop: HEADER_MAX_HEIGHT,
    backgroundColor: Theme.background(props),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...(props.isFlatlistEmpty ? { flex: 1 } : { paddingBottom: HEADER_MAX_HEIGHT }),
  },
}))``;

export default BottomSheetFlatList;
