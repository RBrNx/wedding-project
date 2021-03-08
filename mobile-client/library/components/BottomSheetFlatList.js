import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, FlatList, RefreshControl, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import useCustomScrollbar from '../hooks/useCustomScrollbar';
import CustomScrollbar from './CustomScrollbar';

const HEADER_MAX_HEIGHT = 350;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const BottomSheetFlatList = ({ data, onRefresh, onScroll, renderItem, ListEmptyComponent, ListFooterComponent }) => {
  const scrollY = useSharedValue(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { colors } = useTheme();
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
    return (
      <Animated.View
        style={[styles.handleContainer, animatedHandleContainerStyle, { backgroundColor: colors.background }]}
      >
        <View style={[styles.handleBackgound, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.handle} />
        </View>
      </Animated.View>
    );
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
        progressBackgroundColor='#14233c'
        colors={['#fff']}
        tintColor='#2991cc'
      />
    );
  };

  return (
    <View style={styles.flatlistContainer}>
      <AnimatedFlatList
        contentContainerStyle={[
          isFlatlistEmpty ? styles.flatlistContentEmpty : styles.flatlistContent,
          { backgroundColor: colors.cardBackground },
        ]}
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
      />
      <CustomScrollbar
        handleSize={scrollbarHandleSize - HEADER_MIN_HEIGHT}
        animatedHandleStyle={animatedHandleStyle}
        style={animatedScrollbarStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  flatlistContent: {
    marginTop: HEADER_MAX_HEIGHT,
    paddingBottom: HEADER_MAX_HEIGHT,
  },
  flatlistContentEmpty: {
    marginTop: HEADER_MAX_HEIGHT,
    flex: 1,
  },
  handleContainer: {
    marginBottom: 5,
  },
  handleBackgound: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handle: {
    width: 30,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#aaa',
  },
});

export default BottomSheetFlatList;
