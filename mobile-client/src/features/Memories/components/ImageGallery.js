import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Platform } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import useImageGalleryGestures from 'library/hooks/useImageGalleryGestures';
import styled from 'styled-components';
import { Colours, Layout } from 'library/styles';
import StandardTextInput from 'library/components/StandardTextInput';
import StandardActionButton from 'library/components/StandardActionButton';
import { AntDesign } from '@expo/vector-icons';
import { useAvoidKeyboard, useBackButton } from 'library/hooks';
import GalleryImage from './GalleryImage';
import ImageGalleryHeader from './ImageGalleryHeader';
import ImageGalleryFooter from './ImageGalleryFooter';

const isAndroid = Platform.OS === 'android';
const imageMargin = 16;
const { width } = Dimensions.get('window');

const ImageGallery = ({ visible, images, captionMode, onCaptionSubmit, onDismiss }) => {
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
    headerFooterVisible,
  } = useImageGalleryGestures({ visible, images, onDismiss, captionMode, imageMargin });
  const [captions, setCaptions] = useState({});
  const [uploading, setUploading] = useState(false);
  const currentCaption = captions[selectedIndex] || '';

  const { avoidKeyboardStyle } = useAvoidKeyboard({
    padding: Platform.select({ ios: 0, android: 50 }),
    includeKeyboardHeight: Platform.OS !== 'android',
  });

  useBackButton(() => {
    if (visible) {
      onDismiss();
      return true;
    }

    return false;
  });

  useEffect(() => {
    if (!captionMode && uploading) setUploading(false);
  }, [captionMode]);

  return (
    <Container pointerEvents={visible ? 'auto' : 'none'} style={showGalleryStyle}>
      <GalleryBackground style={containerBackgroundStyle} />
      <ImageGalleryHeader
        headerFooterVisible={headerFooterVisible}
        index={selectedIndex}
        imageCount={images.length}
        onDismiss={onDismiss}
      />
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
                          <StyledGalleryImage
                            key={`${image._id || image.id}`}
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
      {!captionMode && (
        <ImageGalleryFooter headerFooterVisible={headerFooterVisible} index={selectedIndex} images={images} />
      )}
      {captionMode && (
        <CaptionInputContainer style={avoidKeyboardStyle}>
          <StandardTextInput
            value={currentCaption}
            onChangeText={value => setCaptions({ ...captions, [selectedIndex]: value })}
            placeholder='Add a caption...'
            rounded
            maxLength={150}
          />
          <StandardActionButton
            label='Upload Images'
            icon={uploading ? <ActivityIndicator color='#fff' /> : <StyledIcon name='clouduploado' size={22} />}
            containerStyle={{ zIndex: 99 }}
            position={{ bottom: 0, right: 16 }}
            onPress={() => {
              setUploading(true);
              onCaptionSubmit(captions);
            }}
          />
        </CaptionInputContainer>
      )}
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

const StyledGalleryImage = styled(GalleryImage)`
  margin-right: ${imageMargin}px;
`;

const CaptionInputContainer = styled(Animated.View)`
  position: absolute;
  bottom: ${Platform.OS === 'ios' ? 48 : 32}px;
  width: 100%;
  padding-left: 5%;
  padding-right: ${width * 0.2 + 8}px;
`;

const StyledIcon = styled(AntDesign)`
  color: ${Colours.neutral.white};
`;

export default ImageGallery;
