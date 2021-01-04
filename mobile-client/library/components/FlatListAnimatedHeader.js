import React, { useState } from 'react';
import { Animated, StyleSheet, Text, RefreshControl, StatusBar, View, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 350;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

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
  const [scrollY] = useState(new Animated.Value(0));
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
  const [scrollOpacity] = useState(new Animated.Value(0));
  const isFlatlistEmpty = !data?.length;

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight) / completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference = visibleScrollBarHeight > scrollIndicatorSize ? visibleScrollBarHeight - scrollIndicatorSize : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollY,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.2],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.75, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const scrollBarTop = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const renderListHandle = () => {
    return (
      <Animated.View
        style={[styles.handleContainer, { transform: [{ translateY }], backgroundColor: colors.background }]}
      >
        <View style={[styles.handleBackgound, { backgroundColor: colors.componentBackground }]}>
          <View style={styles.handle} />
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={styles.headerContainer} pointerEvents='none'>
        <Animated.View style={[styles.headerImage, { opacity: imageOpacity, transform: [{ scale: imageScale }] }]}>
          {renderImage && renderImage()}
        </Animated.View>
        <Text style={styles.headerTitle}>{title}</Text>
      </Animated.View>
      <View style={styles.flatlistContainer}>
        <Animated.FlatList
          contentContainerStyle={[
            isFlatlistEmpty ? styles.flatlistContentEmpty : styles.flatlistContent,
            { backgroundColor: colors.componentBackground },
          ]}
          scrollEventThrottle={1}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          renderItem={renderItem}
          data={data}
          keyExtractor={item => item._id}
          initialNumToRender={20}
          ListHeaderComponent={renderListHandle}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={ListFooterComponent}
          stickyHeaderIndices={[0]}
          refreshControl={
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
          }
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(_, contentHeight) => {
            setCompleteScrollBarHeight(contentHeight);
          }}
          onLayout={e => {
            setVisibleScrollBarHeight(e.nativeEvent.layout.height);
          }}
          onScrollBeginDrag={() => {
            Animated.timing(scrollOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }}
          onMomentumScrollEnd={() => {
            Animated.timing(scrollOpacity, {
              toValue: 0,
              delay: 200,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }}
          scrollEnabled={!isFlatlistEmpty}
        />
        <Animated.View
          style={{
            position: 'absolute',
            right: 2,
            // height: '100%',
            top: 10,
            height: height - HEADER_MIN_HEIGHT - 10,
            width: 6,
            // backgroundColor: '#52057b',
            borderRadius: 8,
            transform: [{ translateY: scrollBarTop }],
          }}
        >
          <Animated.View
            style={{
              width: 2,
              borderRadius: 8,
              // backgroundColor: '#bc6ff1',
              backgroundColor: 'darkgray',
              height: scrollIndicatorSize - HEADER_MIN_HEIGHT,
              transform: [{ translateY: scrollIndicatorPosition }],
              opacity: scrollOpacity,
            }}
          />
        </Animated.View>
      </View>
      <Animated.View style={[styles.navigationBar, { opacity: titleOpacity, backgroundColor: colors.background }]}>
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
