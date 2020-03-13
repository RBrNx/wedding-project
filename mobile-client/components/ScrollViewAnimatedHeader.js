import React, { useRef } from 'react';
import { StyleSheet, Text, StatusBar, View, Dimensions } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 350;
const HEADER_MIN_HEIGHT = 100;

const ScrollViewAnimatedHeader = ({ children, title, imageSource }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const imageOpacity = Animated.interpolate(scrollY, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 1],
    extrapolate: 'clamp',
  });

  const imageScale = Animated.interpolate(scrollY, {
    inputRange: [0, 1],
    outputRange: [0.2, 1],
    extrapolate: 'clamp',
  });

  const titleOpacity = Animated.interpolate(scrollY, {
    inputRange: [0, 0.75, 1],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const renderContent = () => {
    return children;
  };

  return (
    <View style={styles.container}>
      <Animated.View pointerEvents='none' style={styles.header}>
        <Animated.Image style={[styles.image, { opacity: imageOpacity, transform: [{ scale: imageScale }] }]} source={imageSource} />
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
      <Animated.View style={[styles.bar, { opacity: titleOpacity }]}>
        <Text style={styles.barTitle}>{title}</Text>
      </Animated.View>
      <BottomSheet
        snapPoints={[height - HEADER_MIN_HEIGHT - 15, height - HEADER_MAX_HEIGHT]}
        initialSnap={1}
        renderContent={renderContent}
        enabledInnerScrolling
        borderRadius={15}
        callbackNode={scrollY}
      />
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
