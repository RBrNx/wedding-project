import React from 'react';
import { Platform } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import useImageGalleryGestures from 'library/hooks/useImageGalleryGestures';
import styled from 'styled-components';
import { Layout } from 'library/styles';
import GalleryImage from './GalleryImage';

const isAndroid = Platform.OS === 'android';

const ImageGallery = ({ visible, images, onDismiss }) => {
  const {
    panRef,
    pinchRef,
    singleTapRef,
    doubleTapRef,
    onPan,
    onPinch,
    onSingleTap,
    onDoubleTap,
    showGalleryStyle,
    containerBackgroundStyle,
    wizardStyle,
    translate,
    scale,
    offsetScale,
    selectedIndex,
  } = useImageGalleryGestures({ visible, images, onDismiss });

  return (
    <Container pointerEvents={visible ? 'auto' : 'none'} style={showGalleryStyle}>
      <GalleryBackground style={containerBackgroundStyle} />
      <TapGestureHandler
        minPointers={1}
        numberOfTaps={1}
        onGestureEvent={onSingleTap}
        ref={singleTapRef}
        waitFor={[panRef, pinchRef, doubleTapRef]}
      >
        <GestureHandlerView>
          <TapGestureHandler
            maxDeltaX={8}
            maxDeltaY={8}
            maxDist={8}
            minPointers={1}
            numberOfTaps={2}
            onGestureEvent={onDoubleTap}
            ref={doubleTapRef}
          >
            <GestureHandlerView>
              <PinchGestureHandler onGestureEvent={onPinch} ref={pinchRef} simultaneousHandlers={[panRef]}>
                <GestureHandlerView>
                  <PanGestureHandler
                    maxPointers={isAndroid ? undefined : 1}
                    minDist={10}
                    onGestureEvent={onPan}
                    ref={panRef}
                    simultaneousHandlers={[pinchRef]}
                  >
                    <GestureHandlerView>
                      <GalleryWizard style={wizardStyle}>
                        {images.map((image, i) => (
                          <GalleryImage
                            key={`${image.id}`}
                            index={i}
                            image={image}
                            scale={scale}
                            offsetScale={offsetScale}
                            isPrevious={selectedIndex > i}
                            isSelected={selectedIndex === i}
                            translate={translate}
                            shouldRender={Math.abs(selectedIndex - i) < 4}
                          />
                        ))}
                      </GalleryWizard>
                    </GestureHandlerView>
                  </PanGestureHandler>
                </GestureHandlerView>
              </PinchGestureHandler>
            </GestureHandlerView>
          </TapGestureHandler>
        </GestureHandlerView>
      </TapGestureHandler>
    </Container>
  );
};

const Container = styled(Animated.View)`
  ${Layout.absoluteFill};
`;

const GalleryBackground = styled(Animated.View)`
  ${Layout.absoluteFill};
`;

const GestureHandlerView = styled(Animated.View)`
  ${Layout.absoluteFill};
`;

const GalleryWizard = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
`;

export default ImageGallery;
