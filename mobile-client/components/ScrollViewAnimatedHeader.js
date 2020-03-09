import React, { useState } from 'react';
import { Animated, StyleSheet, Text, RefreshControl, StatusBar } from 'react-native';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ScrollViewAnimatedHeader = ({ children, title, imageSource }) => {
  const [scrollY] = useState(new Animated.Value(0));
  const [isRefreshing, setIsRefreshing] = useState(false);

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 100],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE - 10, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 0.5, 1],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={1}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            progressViewOffset={HEADER_MAX_HEIGHT}
            onRefresh={() => {
              setIsRefreshing(true);
            }}
          />
        }
        contentInset={{
          top: HEADER_MAX_HEIGHT,
        }}
        contentOffset={{
          y: -HEADER_MAX_HEIGHT,
        }}
      >
        {children}
      </Animated.ScrollView>
      <Animated.View pointerEvents='none' style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}>
        <Animated.Image style={[styles.image, { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }]} source={imageSource} />
      </Animated.View>
      <Animated.View style={[styles.bar, { opacity: titleOpacity }]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#14233c',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    padding: 30,
  },
  image: {
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'contain',
  },
  bar: {
    backgroundColor: 'transparent',
    height: HEADER_MIN_HEIGHT,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 24,
  },
});

export default ScrollViewAnimatedHeader;
