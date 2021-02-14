import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import AnimatedFlatlist from './AnimatedFlatlist';

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
  const scrollY = useSharedValue(0);

  const scrollHandler = event => {
    'worklet';

    scrollY.value = event.contentOffset.y;
  };

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

  return (
    <View style={styles.container}>
      <Animated.View style={styles.headerContainer} pointerEvents='none'>
        <Animated.View style={[styles.headerImage, animatedImageStyle]}>{renderImage && renderImage()}</Animated.View>
        <Text style={styles.headerTitle}>{title}</Text>
      </Animated.View>
      <AnimatedFlatlist
        data={data}
        onScroll={scrollHandler}
        onRefresh={onRefresh}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
      />
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
