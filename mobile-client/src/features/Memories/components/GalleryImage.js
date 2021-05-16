import React from 'react';
import { Dimensions, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const halfScreenWidth = screenWidth / 2;
const oneEight = 1 / 8;

const GalleryImage = React.memo(
  ({ index, offsetScale, image, isPrevious, scale, isSelected, shouldRender, translateX, translateY, style }) => {
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
        if (isSelected) return translateX.value + xScaleOffset;
        if (scale.value < 1 || scale.value !== offsetScale.value) return xScaleOffset;
        if (isPrevious) return translateX.value - halfScreenWidth * (scale.value - 1) + xScaleOffset;
        return translateX.value + halfScreenWidth * (scale.value - 1) + xScaleOffset;
      })();

      return {
        transform: [
          { translateX: _translateX },
          { translateY: isSelected ? translateY.value + yScaleOffset : yScaleOffset },
          { scale: isSelected ? scale.value / 8 : oneEight },
          { scaleX: -1 },
        ],
      };
    }, [isPrevious, isSelected]);

    /**
     * An empty view is rendered for images not close to the currently
     * selected in order to maintain spacing while reducing the image
     * load on memory.
     */
    if (!shouldRender) {
      return <View style={[style, { transform: [{ scale: oneEight }] }]} />;
    }

    return (
      <Animated.Image
        resizeMode='contain'
        source={{ uri: image?.downloadUrl }}
        style={[
          style,
          animatedGalleryImageStyle,
          {
            transform: [
              { scaleX: -1 },
              { translateY: -screenHeight * 3.5 },
              {
                translateX: -translateX.value + 7 * screenWidth * (0.5 + index),
              },
              { scale: oneEight },
            ],
          },
        ]}
      />
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.shouldRender === nextProps.shouldRender &&
      prevProps.image.downloadUrl === nextProps.image.downloadUrl &&
      prevProps.isPrevious === nextProps.isPrevious &&
      prevProps.index === nextProps.index
    ) {
      return true;
    }
    return false;
  },
);

export default GalleryImage;
