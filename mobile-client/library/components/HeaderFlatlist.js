import React from 'react';
import { StatusBar } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Colours, Layout, Typography } from '../../styles';
import BottomSheetFlatList from './BottomSheetFlatList';

const HEADER_MAX_HEIGHT = 350;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HeaderFlatlist = ({
  title,
  renderImage,
  onRefresh,
  renderItem,
  data,
  ListEmptyComponent,
  ListFooterComponent,
}) => {
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
    <Container>
      <HeaderContainer pointerEvents='none'>
        <HeaderImage style={animatedImageStyle}>{renderImage && renderImage()}</HeaderImage>
        <HeaderText>{title}</HeaderText>
      </HeaderContainer>
      <BottomSheetFlatList
        data={data}
        onScroll={scrollHandler}
        onRefresh={onRefresh}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
      />
      <NavigationBar style={animatedNavBarStyle}>
        <NavigationBarTitle>{title}</NavigationBarTitle>
      </NavigationBar>
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
  padding: 40px;
  ${Layout.flexCenter};
  overflow: hidden;
`;

const HeaderImage = styled(Animated.View)`
  width: 100%;
  resize-mode: contain;
  ${Layout.flexCenter};
`;

const HeaderText = styled.Text`
  position: absolute;
  ${Typography.heading};
  color: ${Colours.neutral.white};
  bottom: 15px;
  text-shadow: 0px 1px 2px;
`;

const NavigationBar = styled(Animated.View)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  ${Layout.flexCenter};
  height: ${HEADER_MIN_HEIGHT}px;
  padding-top: ${StatusBar.currentHeight || HEADER_MIN_HEIGHT / 2 - 12}px;
  background-color: ${Colours.primary};
`;

const NavigationBarTitle = styled.Text`
  font-size: 24px;
  color: ${Colours.neutral.white};
`;

export default HeaderFlatlist;
