import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import useImageGalleryGestures from 'library/hooks/useImageGalleryGestures';
import GalleryImage from './GalleryImage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';
const MARGIN = 32;

const ImageGallery = ({ visible = true, images }) => {
  const {
    panRef,
    pinchRef,
    singleTapRef,
    doubleTapRef,
    onPan,
    onPinch,
    onSingleTap,
    onDoubleTap,
    showScreenStyle,
    containerBackgroundStyle,
    pagerStyle,
    translationX,
    translateX,
    translateY,
    scale,
    offsetScale,
    selectedIndex,
  } = useImageGalleryGestures({ visible, images });

  return (
    <Animated.View pointerEvents={visible ? 'auto' : 'none'} style={[StyleSheet.absoluteFillObject, showScreenStyle]}>
      <Animated.View style={[StyleSheet.absoluteFillObject, containerBackgroundStyle]} />
      <TapGestureHandler
        minPointers={1}
        numberOfTaps={1}
        onGestureEvent={onSingleTap}
        ref={singleTapRef}
        waitFor={[panRef, pinchRef, doubleTapRef]}
      >
        <Animated.View style={StyleSheet.absoluteFillObject}>
          <TapGestureHandler
            maxDeltaX={8}
            maxDeltaY={8}
            maxDist={8}
            minPointers={1}
            numberOfTaps={2}
            onGestureEvent={onDoubleTap}
            ref={doubleTapRef}
          >
            <Animated.View style={StyleSheet.absoluteFillObject}>
              <PinchGestureHandler onGestureEvent={onPinch} ref={pinchRef} simultaneousHandlers={[panRef]}>
                <Animated.View style={StyleSheet.absoluteFill}>
                  <PanGestureHandler
                    maxPointers={isAndroid ? undefined : 1}
                    minDist={10}
                    onGestureEvent={onPan}
                    ref={panRef}
                    simultaneousHandlers={[pinchRef]}
                  >
                    <Animated.View style={StyleSheet.absoluteFill}>
                      <Animated.View
                        style={[
                          styles.animatedContainer,
                          pagerStyle,
                          {
                            transform: [
                              { scaleX: -1 }, // Also only here for opening, wrong direction when not included
                              {
                                translateX: translationX.value, // Only here for opening, wrong index when this is not included
                              },
                            ],
                          },
                        ]}
                      >
                        {images.map((image, i) => (
                          <GalleryImage
                            key={`${image.id}`}
                            index={i}
                            offsetScale={offsetScale}
                            image={image}
                            isPrevious={selectedIndex > i}
                            scale={scale}
                            isSelected={selectedIndex === i}
                            shouldRender={Math.abs(selectedIndex - i) < 4}
                            style={{
                              height: screenHeight * 8,
                              marginRight: MARGIN,
                              width: screenWidth * 8,
                            }}
                            translateX={translateX}
                            translateY={translateY}
                          />
                        ))}
                      </Animated.View>
                    </Animated.View>
                  </PanGestureHandler>
                </Animated.View>
              </PinchGestureHandler>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ImageGallery;
