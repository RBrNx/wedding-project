import StandardPressable from 'library/components/StandardPressable';
import { Colours, Layout } from 'library/styles';
import React, { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';

const MemoryUploaderThumbnail = React.memo(
  ({ asset, isSelected, size, selectedAssetIndex, onThumbnailSelect }) => {
    const imageScale = useSharedValue(1);

    useEffect(() => {
      imageScale.value = withTiming(isSelected ? 0.85 : 1, { duration: 500, easing: Easing.out(Easing.exp) });
    }, [isSelected]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: imageScale.value }],
    }));

    return (
      <Container size={size}>
        <StyledImage source={{ uri: asset.uri }} style={animatedStyle} />
        <SelectorIcon isSelected={isSelected} onPress={() => onThumbnailSelect(asset, isSelected)}>
          {isSelected && <SelectedIndex>{selectedAssetIndex}</SelectedIndex>}
        </SelectorIcon>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.size === nextProps.size &&
      prevProps.selectedAssetIndex === nextProps.selectedAssetIndex &&
      prevProps.asset.id === nextProps.asset.id
    ) {
      return true;
    }
    return false;
  },
);

const Container = styled.View`
  flex: ${1 / 3};
  margin: 3px;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  background-color: rgba(0, 0, 0, 0.15);
`;

const SelectorIcon = styled(StandardPressable)`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  border: 1.5px solid ${props => (props.isSelected ? Colours.secondary : 'white')};
  background-color: ${props => (props.isSelected ? Colours.secondary : 'transparent')};
  ${Layout.flexCenter}
`;

const SelectedIndex = styled.Text`
  color: ${Colours.neutral.white};
`;

const StyledImage = styled(Animated.Image)`
  width: 100%;
  height: 100%;
`;

export default MemoryUploaderThumbnail;
