import React, { useState } from 'react';
import { RefreshControl, Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';
import { Colours, Layout, Theme } from 'library/styles';
import { BottomSheet } from 'library/utils/constants';
import { useAvoidKeyboard, useCustomScrollbar } from 'library/hooks';
import ListHandle from 'library/components/ListHandle';
import CustomScrollbar from 'library/components/CustomScrollbar';
import Spacer from 'library/components/Spacer';

const { HEADER_MAX_HEIGHT } = BottomSheet;
const { height } = Dimensions.get('window');
const HANDLE_HEIGHT = 20;

const BottomSheetScrollView = ({
  children,
  onRefresh,
  onScroll,
  topOffset = getStatusBarHeight(),
  collapsedPosition = HEADER_MAX_HEIGHT,
  unlockFullScroll = false,
  enableRefreshControl = false,
  keyboardShouldPersistTaps,
}) => {
  const scrollY = useSharedValue(0);
  const scrollView = useAnimatedRef();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {
    setTotalScrollbarHeight,
    setVisibleScrollbarHeight,
    animatedHandleStyle,
    scrollbarHandleSize,
    scrollbarOpacity,
    showScrollbar,
    hideScrollbar,
  } = useCustomScrollbar(scrollY);
  useAvoidKeyboard({
    handleShow: event => {
      const { height: keyboardHeight } = event.endCoordinates;
      setLastScrollY(scrollY.value);
      scrollView.current.scrollTo({ x: 0, y: keyboardHeight, animated: true });
    },
    handleHide: () => {
      scrollView.current.scrollTo({ x: 0, y: lastScrollY, animated: true });
    },
  });

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
        progressBackgroundColor={Colours.primary}
        colors={[Colours.neutral.white]}
        tintColor={Colours.primary}
      />
    );
  };

  return (
    <Container topOffset={topOffset}>
      <ListHandle animatedHandleContainerStyle={animatedHandleContainerStyle} />
      <ScrollViewContainer>
        <StyledAnimatedScrollView
          ref={scrollView}
          topOffset={topOffset}
          unlockFullScroll={unlockFullScroll}
          collapsedPosition={collapsedPosition}
          onScroll={scrollHandler}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          refreshControl={enableRefreshControl ? renderRefreshControl() : null}
          onScrollBeginDrag={showScrollbar}
          onMomentumScrollEnd={hideScrollbar}
          overScrollMode='never'
          bounces={false}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          onContentSizeChange={(contentWidth, contentHeight) => {
            setTotalScrollbarHeight(contentHeight);
          }}
          onLayout={e => {
            setVisibleScrollbarHeight(e.nativeEvent.layout.height);
          }}
        >
          {children}
          {unlockFullScroll && <Spacer size={collapsedPosition} />}
        </StyledAnimatedScrollView>
        <CustomScrollbar
          handleSize={scrollbarHandleSize}
          animatedHandleStyle={animatedHandleStyle}
          style={animatedScrollbarStyle}
        />
      </ScrollViewContainer>
    </Container>
  );
};

const Container = styled.View`
  ${Layout.absoluteFill};
  top: ${props => props.topOffset}px;
`;

const ScrollViewContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const StyledAnimatedScrollView = styled(Animated.ScrollView).attrs(props => ({
  contentContainerStyle: {
    backgroundColor: Theme.background(props),
    marginTop: props.collapsedPosition,
    minHeight: props.unlockFullScroll
      ? height - props.topOffset + props.collapsedPosition
      : height - props.collapsedPosition - HANDLE_HEIGHT,
    alignItems: 'center',
  },
}))``;

export default BottomSheetScrollView;
