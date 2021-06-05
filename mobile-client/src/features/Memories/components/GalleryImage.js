import React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const halfScreenWidth = screenWidth / 2;
const IMAGE_SCALE_MODIFIER = 8;
const IMAGE_SCALE = 1 / IMAGE_SCALE_MODIFIER;

const GalleryImage = React.memo(
  ({ index, offsetScale, image, isPrevious, scale, isSelected, shouldRender, translate, style }) => {
    /**
     * The current image, designated by selected is scaled and translated
     * based on the gestures. The rendered images before and after the
     * currently selected image also translated in X if the scale is
     * greater than one so they keep the same distance from the selected
     * image as it is scaled. If the scale is less than one they stay in
     * place as to not come into the screen when the image shrinks.
     */
    const animatedGalleryImageStyle = useAnimatedStyle(() => {
      const xScaleOffset = -7 * screenWidth * (0.5 + index);
      const yScaleOffset = -screenHeight * 3.5;
      const _translateX = (() => {
        if (isSelected) return translate.x.value + xScaleOffset;
        if (scale.value < 1 || scale.value !== offsetScale.value) return xScaleOffset;
        if (isPrevious) return translate.x.value - halfScreenWidth * (scale.value - 1) + xScaleOffset;
        return translate.x.value + halfScreenWidth * (scale.value - 1) + xScaleOffset;
      })();

      return {
        transform: [
          { translateX: _translateX },
          { translateY: isSelected ? translate.y.value + yScaleOffset : yScaleOffset },
          { scale: isSelected ? scale.value / IMAGE_SCALE_MODIFIER : IMAGE_SCALE },
        ],
      };
    }, [isPrevious, isSelected]);

    /**
     * An empty view is rendered for images not close to the currently
     * selected in order to maintain spacing while reducing the image
     * load on memory.
     */
    if (!shouldRender) {
      return <EmptyView style={[style, animatedGalleryImageStyle]} />;
    }

    return <StyledImage resizeMode='contain' source={{ uri: image?.url }} style={[style, animatedGalleryImageStyle]} />;
  },
  (prevProps, nextProps) => {
    if (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.shouldRender === nextProps.shouldRender &&
      prevProps.image.url === nextProps.image.url &&
      prevProps.isPrevious === nextProps.isPrevious &&
      prevProps.index === nextProps.index
    ) {
      return true;
    }
    return false;
  },
);

const EmptyView = styled(Animated.View)`
  height: ${screenHeight * IMAGE_SCALE_MODIFIER}px;
  width: ${screenWidth * IMAGE_SCALE_MODIFIER}px;
`;

const StyledImage = styled(Animated.Image)`
  height: ${screenHeight * IMAGE_SCALE_MODIFIER}px;
  width: ${screenWidth * IMAGE_SCALE_MODIFIER}px;
  margin-right: 32px;
  margin-top: ${StatusBar?.currentHeight || 0}px;
`;

export default GalleryImage;
