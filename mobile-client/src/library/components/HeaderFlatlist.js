import React from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Layout } from 'library/styles';
import { BottomSheet } from 'library/utils/constants';
import BottomSheetFlatList from 'library/components/BottomSheetFlatList';

const { HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE } = BottomSheet;

const HeaderFlatlist = ({ renderImage, onRefresh, renderItem, data, ListEmptyComponent, ListFooterComponent }) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = event => {
    'worklet';

    scrollY.value = event.contentOffset.y;
  };

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
    <Container>
      <HeaderContainer pointerEvents='none'>
        <HeaderImage style={animatedImageStyle}>{renderImage && renderImage()}</HeaderImage>
      </HeaderContainer>
      <BottomSheetFlatList
        data={data}
        onScroll={scrollHandler}
        onRefresh={onRefresh}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const HeaderContainer = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: ${HEADER_MAX_HEIGHT}px;
  padding-horizontal: 40px;
  ${Layout.flexCenter};
  overflow: hidden;
`;

const HeaderImage = styled(Animated.View)`
  width: 100%;
  resize-mode: contain;
  ${Layout.flexCenter};
`;

export default HeaderFlatlist;
