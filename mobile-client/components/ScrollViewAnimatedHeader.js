import React, { useState } from 'react';
import { Animated, StyleSheet, Text, RefreshControl, StatusBar, View } from 'react-native';

const HEADER_MAX_HEIGHT = 350;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ScrollViewAnimatedHeader = ({ title, imageSource, onRefresh, renderItem, data }) => {
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

  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View pointerEvents='none' style={styles.header}>
        <Animated.Image style={[styles.image, { opacity: imageOpacity, transform: [{ scale: imageScale }] }]} source={imageSource} />
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
      <Animated.FlatList
        style={styles.scrollview}
        contentContainerStyle={{
          backgroundColor: '#fff',
          marginTop: HEADER_MAX_HEIGHT,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          overflow: 'hidden',
        }}
        scrollEventThrottle={1}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        renderItem={renderItem}
        data={data}
        keyExtractor={item => item._id}
        ListHeaderComponent={() => (
          <Animated.View style={{ transform: [{ translateY }], backgroundColor: '#14233c' }}>
            <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, width: '100%', height: 20 }} />
          </Animated.View>
        )}
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
      />
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

export default ScrollViewAnimatedHeader;
