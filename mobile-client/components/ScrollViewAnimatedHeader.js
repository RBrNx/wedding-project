import React, { useState } from 'react';
import { Animated, StyleSheet, Text, RefreshControl, StatusBar, View, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 350;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ScrollViewAnimatedHeader = ({ children, title, imageSource, onRefresh }) => {
  const [scrollY] = useState(new Animated.Value(0));
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  return (
    <View style={styles.container}>
      <Animated.View pointerEvents='none' style={styles.header}>
        <Animated.Image style={[styles.image, { opacity: imageOpacity, transform: [{ scale: imageScale }] }]} source={imageSource} />
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollview}
        contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT, backgroundColor: '#14233c' }}
        scrollEventThrottle={1}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            progressViewOffset={HEADER_MAX_HEIGHT}
            onRefresh={async () => {
              setIsRefreshing(true);
              await onRefresh();
              setIsRefreshing(false);
            }}
          />
        }
      >
        <View style={{ minHeight: height - HEADER_MAX_HEIGHT, flex: 1 }}>{children}</View>
      </Animated.ScrollView>
      <Animated.View style={[styles.bar, { opacity: titleOpacity }]}>
        <Text style={styles.barTitle}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14233c',
  },
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
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    position: 'absolute',
    fontSize: 36,
    color: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    textShadowColor: '#000',
    bottom: 15,
  },
  bar: {
    backgroundColor: '#14233c',
    height: HEADER_MIN_HEIGHT,
    paddingTop: StatusBar.currentHeight,
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

export default ScrollViewAnimatedHeader;
