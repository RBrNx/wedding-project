import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, RefreshControl, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ListHandle from '../../components/ListHandle';
import useCustomScrollbar from '../hooks/useCustomScrollbar';
import CustomScrollbar from './CustomScrollbar';

const AnimatedScrollview = ({ children, onRefresh, onScroll, topOffset, collapsedPosition = 350 }) => {
  const scrollY = useSharedValue(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { colors } = useTheme();
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
    const translateY = interpolate(scrollY.value, [0, collapsedPosition], [collapsedPosition, 0], Extrapolate.CLAMP);

    return {
      transform: [{ translateY }],
    };
  });

  const animatedScrollbarStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, collapsedPosition], [collapsedPosition, 0], Extrapolate.CLAMP);

    return {
      transform: [{ translateY }],
      opacity: scrollbarOpacity.value,
    };
  });

  const renderRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={isRefreshing}
        progressViewOffset={collapsedPosition + 15}
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
    <View style={[styles.container, { top: topOffset }]}>
      <ListHandle animatedHandleContainerStyle={animatedHandleContainerStyle} />
      <View style={styles.scrollviewContainer}>
        <Animated.ScrollView
          style={styles.scrollview}
          contentContainerStyle={{
            backgroundColor: colors.cardBackground,
            marginTop: collapsedPosition,
            paddingBottom: collapsedPosition,
          }}
          onScroll={scrollHandler}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          // refreshControl={renderRefreshControl()}
          onContentSizeChange={(contentWidth, contentHeight) => {
            setTotalScrollbarHeight(contentHeight);
          }}
          onLayout={e => {
            setVisibleScrollbarHeight(e.nativeEvent.layout.height);
          }}
          onScrollBeginDrag={showScrollbar}
          onMomentumScrollEnd={hideScrollbar}
        >
          {children}
        </Animated.ScrollView>
        <CustomScrollbar
          handleSize={scrollbarHandleSize}
          animatedHandleStyle={animatedHandleStyle}
          style={animatedScrollbarStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollviewContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default AnimatedScrollview;
