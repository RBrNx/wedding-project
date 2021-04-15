import React, { useState } from 'react';
import { RefreshControl, Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import ListHandle from '../../components/ListHandle';
import { Colours, Layout, Theme } from '../../styles';
import { BottomSheet } from '../helpers/constants';
import useCustomScrollbar from '../hooks/useCustomScrollbar';
import CustomScrollbar from './CustomScrollbar';
import Spacer from './Spacer';

const { HEADER_MAX_HEIGHT } = BottomSheet;
const { height } = Dimensions.get('window');
const HANDLE_HEIGHT = 20;

const BottomSheetScrollView = ({
  children,
  onRefresh,
  onScroll,
  topOffset,
  collapsedPosition = HEADER_MAX_HEIGHT,
  unlockFullScroll = false,
  enableRefreshControl = false,
}) => {
  const scrollY = useSharedValue(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
