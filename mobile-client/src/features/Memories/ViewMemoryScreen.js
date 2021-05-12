import { HeaderBackButton } from '@react-navigation/stack';
import CachedImage from 'library/components/CachedImage';
import withAnimated from 'library/components/withAnimated';
import { Colours } from 'library/styles';
import React, { useLayoutEffect, useState } from 'react';
import { Dimensions, Pressable } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedBackButton = withAnimated(HeaderBackButton);
const { height } = Dimensions.get('screen');

const ViewMemoryScreen = ({ route, navigation }) => {
  const { image = {} } = route?.params || {};
  const uiOpacity = useSharedValue(1);
  const [uiVisible, setUIVisible] = useState(true);

  const uiAnimatedStyle = useAnimatedStyle(() => ({
    opacity: uiOpacity.value,
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

  return (
    <Container>
      <Pressable onPress={toggleUI}>
        <StyledImage source={{ uri: image?.downloadUrl }} resizeMode='contain' />
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
