import { HeaderBackButton } from '@react-navigation/stack';
import CachedImage from 'library/components/CachedImage';
import withAnimated from 'library/components/withAnimated';
import { Colours } from 'library/styles';
import { clamp } from 'library/worklets';
import React, { useLayoutEffect, useState } from 'react';
import { Dimensions, Pressable } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedBackButton = withAnimated(HeaderBackButton);
const { height } = Dimensions.get('screen');
const MIN_SCALE = 1;
const MAX_SCALE = 5;

const ViewMemoryScreen = ({ route, navigation }) => {
  const { image = {} } = route?.params || {};
  const uiOpacity = useSharedValue(1);
  const baseScale = useSharedValue(1);
  const pinchScale = useSharedValue(1);
  const imageScale = useSharedValue(1);
  const [uiVisible, setUIVisible] = useState(true);

  const uiAnimatedStyle = useAnimatedStyle(() => ({
    opacity: uiOpacity.value,
  }));

  const scaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AnimatedBackButton style={uiAnimatedStyle} onPress={() => navigation.pop()} />,
    });
  }, []);

  const toggleUI = () => {
    if (uiVisible) {
      uiOpacity.value = withTiming(0, { duration: 200 });
      setUIVisible(false);
    } else {
      uiOpacity.value = withTiming(1, { duration: 200 });
      setUIVisible(true);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      if (!context.lastScale) context.lastScale = 1;
    },
    onActive: event => {
      const nextScale = baseScale.value * pinchScale.value;
      if (nextScale >= MIN_SCALE && nextScale <= MAX_SCALE) {
        pinchScale.value = event.scale;
        imageScale.value = nextScale;
      }
    },
    onFinish: (event, context) => {
      context.lastScale = clamp(context.lastScale * event.scale, MIN_SCALE, MAX_SCALE);
      baseScale.value = context.lastScale;
      pinchScale.value = 1;
    },
  });

  return (
    <Container>
      <Pressable onPress={toggleUI}>
        <PinchGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={scaleAnimatedStyle}>
            <StyledImage source={{ uri: image?.downloadUrl }} resizeMode='contain' />
          </Animated.View>
        </PinchGestureHandler>
      </Pressable>
    </Container>
  );
};

const Container = styled.View`
  height: ${height}px;
  background-color: ${Colours.neutral.black};
`;

const StyledImage = styled(CachedImage)`
  height: 100%;
  width: 100%;
`;

export default ViewMemoryScreen;
