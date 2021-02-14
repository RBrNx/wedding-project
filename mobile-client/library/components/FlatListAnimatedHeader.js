import React, { useState } from 'react';
import { StyleSheet, Text, RefreshControl, StatusBar, View, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
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

const FlatListAnimatedHeader = ({
  title,
  renderImage,
  onRefresh,
  renderItem,
  data,
  ListEmptyComponent,
  ListFooterComponent,
}) => {
  const { colors } = useTheme();
  // const [scrollY] = useState(new Animated.Value(0));
  const scrollY = useSharedValue(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const {
  //   setTotalScrollbarHeight,
  //   setVisibleScrollbarHeight,
  //   scrollbarHandlePosition,
  //   scrollbarHandleSize,
  //   scrollbarOpacity,
  //   showScrollbar,
  //   hideScrollbar,
  // } = useCustomScrollbar(scrollY);

  const isFlatlistEmpty = !data?.length;

  // const imageOpacity = scrollY.interpolate({
  //   inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
  //   outputRange: [1, 1, 0],
  //   extrapolate: 'clamp',
  // });

  // const imageScale = scrollY.interpolate({
  //   inputRange: [0, HEADER_SCROLL_DISTANCE],
  //   outputRange: [1, 0.2],
  //   extrapolate: 'clamp',
  // });

  // const titleOpacity = scrollY.interpolate({
  //   inputRange: [0, HEADER_SCROLL_DISTANCE * 0.75, HEADER_SCROLL_DISTANCE],
  //   outputRange: [0, 0.5, 1],
  //   extrapolate: 'clamp',
  // });

  // const translateY = scrollY.interpolate({
  //   inputRange: [0, HEADER_SCROLL_DISTANCE],
  //   outputRange: [0, -HEADER_SCROLL_DISTANCE],
  //   extrapolate: 'clamp',
  // });

  // const scrollBarTop = scrollY.interpolate({
  //   inputRange: [0, HEADER_SCROLL_DISTANCE],
  //   outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
  //   extrapolate: 'clamp',
  // });

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedHandleStyle = useAnimatedStyle(() => {
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

  const animatedNavBarStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE * 0.75, HEADER_SCROLL_DISTANCE],
      [0, 0.5, 1],
      Extrapolate.CLAMP,
    ),
  }));

  const animatedImageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [1, 1, 0],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(scrollY.value, [0, HEADER_SCROLL_DISTANCE], [1, 0.2], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const renderListHandle = () => {
    return (
      <Animated.View style={[styles.handleContainer, animatedHandleStyle, { backgroundColor: colors.background }]}>
        <View style={[styles.handleBackgound, { backgroundColor: colors.cardBackround }]}>
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
    <View style={styles.container}>
      <Animated.View style={styles.headerContainer} pointerEvents='none'>
        <Animated.View style={[styles.headerImage, animatedImageStyle]}>{renderImage && renderImage()}</Animated.View>
        <Text style={styles.headerTitle}>{title}</Text>
      </Animated.View>
      <View style={styles.flatlistContainer}>
        <AnimatedFlatList
          contentContainerStyle={[
            isFlatlistEmpty ? styles.flatlistContentEmpty : styles.flatlistContent,
            { backgroundColor: colors.cardBackround },
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
          // onContentSizeChange={(contentWidth, contentHeight) => {
          //   setTotalScrollbarHeight(contentHeight);
          // }}
          // onLayout={e => {
          //   setVisibleScrollbarHeight(e.nativeEvent.layout.height);
          // }}
          // onScrollBeginDrag={showScrollbar}
          // onMomentumScrollEnd={hideScrollbar}
          scrollEnabled={!isFlatlistEmpty}
        />
        {/* <CustomScrollbar
          handleSize={scrollbarHandleSize - HEADER_MIN_HEIGHT}
          handlePosition={scrollbarHandlePosition}
          style={{
            transform: [{ translateY: scrollBarTop }],
            opacity: scrollbarOpacity,
          }}
        /> */}
      </View>
      <Animated.View style={[styles.navigationBar, animatedNavBarStyle, { backgroundColor: colors.background }]}>
        <Text style={styles.barTitle}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    position: 'absolute',
    fontSize: 36,
    color: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    textShadowColor: '#000',
    bottom: 15,
  },
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
  navigationBar: {
    height: HEADER_MIN_HEIGHT,
    paddingTop: StatusBar.currentHeight || HEADER_MIN_HEIGHT / 2 - 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  barTitle: {
    color: '#fff',
    fontSize: 24,
  },
});

export default FlatListAnimatedHeader;
