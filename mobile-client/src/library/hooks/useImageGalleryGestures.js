import useVector from 'library/hooks/useVector';
import { clamp } from 'library/worklets';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Keyboard, Platform } from 'react-native';
import {
  cancelAnimation,
  Easing,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';

const HasPinched = Object.freeze({
  FALSE: 0,
  TRUE: 1,
});

const IsSwiping = Object.freeze({
  UNDETERMINED: 0,
  TRUE: 1,
  FALSE: 2,
});

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';
const halfScreenHeight = screenHeight / 2;
const quarterScreenHeight = screenHeight / 4;
const halfScreenWidth = screenWidth / 2;
const MIN_SCALE = 1;
const MAX_SCALE = 8;
const STOP_BUFFER = 3; // Allows an excess buffer when checking that motion has stopped
const SWIPE_SCALE_MODIFIER = 0.5;

const useImageGalleryGestures = ({ visible, images, onDismiss, imageMargin = 0 }) => {
  /**
   * Fade animation for screen, it is always rendered with pointerEvents
   * set to none for fast opening
   */
  const showScreen = useSharedValue(0);
  const fadeScreen = show => {
    'worklet';

    showScreen.value = withTiming(show ? 1 : 0, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });
  };

  /**
   * Run the fade animation on visible change
   */
  useEffect(() => {
    if (visible) {
      Keyboard.dismiss();
    } else {
      resetVisibleValues();
    }

    fadeScreen(visible);
  }, [visible]);

  /**
   * Image height from URL or default to full screen height
   */
  const [currentImageHeight, setCurrentImageHeight] = useState(screenHeight);

  /**
   * JS and UI index values, the JS follows the UI but is needed
   * for rendering the virtualized image list
   */
  const [selectedIndex, setSelectedIndex] = useState(0);
  const index = useSharedValue(0);

  /**
   * Header visible value for animating in out
   */
  const headerFooterVisible = useSharedValue(1);

  /**
   * Gesture handler refs
   */
  const panRef = useRef(null);
  const pinchRef = useRef(null);
  const singleTapRef = useRef(null);
  const doubleTapRef = useRef(null);

  /**
   * Shared values for movement
   */
  const offset = useVector(0, 0);
  const translate = useVector(0, 0);
  const offsetScale = useSharedValue(1);
  const scale = useSharedValue(1);
  const translationX = useSharedValue(0);

  /**
   * Shared values for touch tracking
   */
  const origin = useVector(0, 0);
  const oldFocal = useVector(0, 0);
  const focalOffset = useVector(0, 0);
  const adjustedFocal = useVector(0, 0);
  const tap = useVector(0, 0);

  /**
   * Shared values for gesture tracking
   */
  const numberOfPinchFingers = useSharedValue(0);
  const isSwiping = useSharedValue(0);
  const isPinch = useSharedValue(false);
  const hasPinched = useSharedValue(0);

  /**
   * Reset gesture values for use on touch release
   */
  const resetTouchValues = () => {
    'worklet';

    origin.set({ x: 0, y: 0 });
    oldFocal.set({ x: 0, y: 0 });
    focalOffset.set({ x: 0, y: 0 });
    numberOfPinchFingers.value = 0;
    isPinch.value = false;
    isSwiping.value = IsSwiping.UNDETERMINED;
  };

  /**
   * Reset movement values for use on selected photo change
   */
  const resetMovementValues = () => {
    'worklet';

    translate.set({ x: 0, y: 0 });
    scale.value = 1;
    offsetScale.value = 1;
  };

  /**
   * Reset all key values for visible
   */
  const resetVisibleValues = () => {
    'worklet';

    resetTouchValues();
    resetMovementValues();
    headerFooterVisible.value = 1;
    offset.set({ x: 0, y: 0 });
    adjustedFocal.set({ x: 0, y: 0 });
    tap.set({ x: 0, y: 0 });
  };

  /**
   * Photos length needs to be kept as a const here so if the length
   * changes it causes the pan gesture handler function to refresh. This
   * does not work if the calculation for the length of the array is left
   * inside the gesture handler as it will have an array as a dependency
   */
  const imageLength = images.length;

  /**
   * Image heights are not provided and therefore need to be calculated.
   * We start by allowing the image to be the full height then reduce it
   * to the proper scaled height based on the width being restricted to the
   * screen width when the dimensions are received.
   */
  const uriForCurrentImage = images[selectedIndex]?.downloadUrl;
  useEffect(() => {
    setCurrentImageHeight(screenHeight);
    if (images[index.value]?.downloadUrl) {
      Image.getSize(images[index.value].downloadUrl, (width, height) => {
        const imageHeight = Math.floor(height * (screenWidth / width));
        setCurrentImageHeight(imageHeight > screenHeight ? screenHeight : imageHeight);
      });
    }
  }, [uriForCurrentImage]);

  /**
   * We use simultaneousHandlers to allow pan and pinch gesture handlers
   * depending on the gesture. The touch is fully handled by the pinch
   * gesture handler once it has began so all interactions by the pan
   * handler are blocked if isPinch.value is true
   */
  const onPan = useAnimatedGestureHandler(
    {
      onActive: evt => {
        if (evt.numberOfPointers === 1 && !isPinch.value) {
          /**
           * If Android where a second finger cannot be added back and
           * removing one finger returns to Pan Handler then adjust origin
           * on finger remove and set swiping false
           */
          if (isAndroid && hasPinched.value === HasPinched.TRUE) {
            hasPinched.value = HasPinched.FALSE;
            isSwiping.value = IsSwiping.FALSE;
            offset.set({ x: translate.x.value + evt.translationX, y: translate.y.value - evt.translationY });
          }
          /**
           * isSwiping is used to prevent Y movement if a clear swipe to next
           * or previous is begun when at the edge of a photo. The value is
           * either 0, 1, or 2, via the IsSwiping enum designating undetermined,
           * true, or false and is reset on releasing the touch
           */
          if (isSwiping.value === IsSwiping.UNDETERMINED) {
            const maxXYRatio = isAndroid ? 1 : 0.25;
            if (
              Math.abs(evt.translationX / evt.translationY) > maxXYRatio &&
              (Math.abs(-halfScreenWidth * (scale.value - 1) - offset.x.value) < STOP_BUFFER ||
                Math.abs(halfScreenWidth * (scale.value - 1) - offset.x.value) < STOP_BUFFER)
            ) {
              isSwiping.value = IsSwiping.TRUE;
            }
            if (Math.abs(evt.translationY) > 25) {
              isSwiping.value = IsSwiping.FALSE;
            }
          }
          /**
           * localEvtScale is used for swipe away
           */
          const localEvtScale = scale.value / offsetScale.value;
          /**
           * If not swiping, translate the image in X and Y to the event
           * translation plus offset. If swiping only translate X, if
           * swiping down when at top of screen or centered balance scale
           * using offset to a degree (this needs improvement the calculation
           * is incorrect but likely needs origin use to be 100%)
           */
          const scaleDifference = scale.value !== offsetScale.value ? localEvtScale : 1;
          if (isSwiping.value !== IsSwiping.TRUE) {
            translate.y.value = offset.y.value * scaleDifference + evt.translationY;
          }
          translate.x.value = offset.x.value * scaleDifference + evt.translationX;

          /**
           * If swiping down start scaling down the image for swipe
           * away effect
           */
          if (currentImageHeight * offsetScale.value < screenHeight && translate.y.value > 0) {
            scale.value = offsetScale.value * (1 - SWIPE_SCALE_MODIFIER * (translate.y.value / screenHeight));
          } else if (
            currentImageHeight * offsetScale.value > screenHeight &&
            translate.y.value > (currentImageHeight / 2) * offsetScale.value - halfScreenHeight
          ) {
            scale.value =
              offsetScale.value *
              (1 -
                SWIPE_SCALE_MODIFIER *
                  ((translate.y.value - ((currentImageHeight / 2) * offsetScale.value - halfScreenHeight)) /
                    screenHeight));
          }
        }
      },
      onFinish: evt => {
        if (!isPinch.value && evt.numberOfPointers < 2) {
          /**
           * To determine if the fling should page to the next image we
           * calculate a final position based on the current position and
           * event velocity
           */
          const finalXPosition = evt.translationX + evt.velocityX * 0.3;
          const finalYPosition = evt.translationY + evt.velocityY * 0.1;
          /**
           * If there is a next photo, the image is lined up to the right
           * edge, the swipe is to the left, and the final position is more
           * than half the screen width, move to the next image
           */
          if (
            index.value < imageLength - 1 &&
            Math.abs(-halfScreenWidth * (scale.value - 1) - offset.x.value) < STOP_BUFFER &&
            translate.x.value < 0 &&
            finalXPosition < -halfScreenWidth &&
            isSwiping.value === IsSwiping.TRUE
          ) {
            cancelAnimation(translationX);
            translationX.value = withTiming(
              -(screenWidth + imageMargin) * (index.value + 1),
              {
                duration: 200,
                easing: Easing.out(Easing.ease),
              },
              () => {
                resetMovementValues();
                index.value += 1;
                runOnJS(setSelectedIndex)(index.value);
              },
            );
            /**
             * If there is a previous photo, the image is lined up to the left
             * edge, the swipe is to the right, and the final position is more
             * than half the screen width, move to the previous image
             */
          } else if (
            index.value > 0 &&
            Math.abs(halfScreenWidth * (scale.value - 1) - offset.x.value) < STOP_BUFFER &&
            translate.x.value > 0 &&
            finalXPosition > halfScreenWidth &&
            isSwiping.value === IsSwiping.TRUE
          ) {
            cancelAnimation(translationX);
            translationX.value = withTiming(
              -(screenWidth + imageMargin) * (index.value - 1),
              {
                duration: 200,
                easing: Easing.out(Easing.ease),
              },
              () => {
                resetMovementValues();
                index.value -= 1;
                runOnJS(setSelectedIndex)(index.value);
              },
            );
          }
          /**
           * When the pan is finished if the scale is less than 1 return the
           * photo to center, if the photo is inside the edges of the screen
           * return the photo to line up with the edges, otherwise use decay
           * with a clamping at the edges to give the effect the image is
           * sliding along using velocity and friction
           */
          const rightEdge = halfScreenWidth * (scale.value - 1);
          const leftEdge = -halfScreenWidth * (scale.value - 1);
          if (scale.value < 1) {
            translate.x.value = withTiming(0);
          } else if (translate.x.value > rightEdge) {
            translate.x.value = withTiming(rightEdge, {
              duration: 200,
            });
          } else if (translate.x.value < leftEdge) {
            translate.x.value = withTiming(leftEdge, {
              duration: 200,
            });
          } else {
            translate.x.value = withDecay({
              clamp: [leftEdge, rightEdge],
              deceleration: 0.99,
              velocity: evt.velocityX,
            });
          }
          /**
           * When the pan is finished if the height is less than the screen
           * height return the photo to center, if the photo is inside the
           * edges of the screen return the photo to line up with the edges,
           * otherwise use decay with a clamping at the edges to give the effect
           * the image is sliding along using velocity and friction
           */
          const topEdge = (-currentImageHeight / 2) * scale.value + halfScreenHeight;
          const bottomEdge = (currentImageHeight / 2) * scale.value - halfScreenHeight;
          if (currentImageHeight * scale.value < screenHeight) {
            translate.y.value = withTiming(0);
          } else if (translate.y.value > bottomEdge) {
            translate.y.value = withTiming(bottomEdge);
          } else if (translate.y.value < topEdge) {
            translate.y.value = withTiming(topEdge);
          } else {
            translate.y.value = withDecay({
              clamp: [topEdge, bottomEdge],
              deceleration: 0.99,
              velocity: evt.velocityY,
            });
          }
          resetTouchValues();
          /**
           * If the scale has been reduced below one, i.e. zoomed out, translate
           * the zoom back to one
           */
          scale.value = scale.value !== offsetScale.value ? withTiming(offsetScale.value) : offsetScale.value;
          /**
           * If the photo is centered or at the top of the screen if scaled larger
           * than the screen, and not paging left or right, and the final Y position
           * is greater than half the screen using swipe velocity and position, close
           * the overlay
           */
          if (
            finalYPosition > halfScreenHeight &&
            offset.y.value + 8 >= (currentImageHeight / 2) * scale.value - halfScreenHeight &&
            isSwiping.value !== IsSwiping.TRUE &&
            translate.y.value !== 0 &&
            !(
              Math.abs(halfScreenWidth * (scale.value - 1) + offset.x.value) < STOP_BUFFER &&
              translate.x.value < 0 &&
              finalXPosition < -halfScreenWidth
            ) &&
            !(
              Math.abs(-halfScreenWidth * (scale.value - 1) + offset.x.value) < STOP_BUFFER &&
              translate.x.value > 0 &&
              finalXPosition > halfScreenWidth
            )
          ) {
            cancelAnimation(translate.x);
            cancelAnimation(translate.y);
            cancelAnimation(scale);

            scale.value = withTiming(
              0.6,
              {
                duration: 200,
                easing: Easing.out(Easing.ease),
              },
              () => {
                showScreen.value = 0;
                runOnJS(onDismiss)();
              },
            );
            translate.y.value =
              evt.velocityY > 1000
                ? withDecay({
                    velocity: evt.velocityY,
                  })
                : withTiming(halfScreenHeight + (currentImageHeight / 2) * scale.value, {
                    duration: 200,
                    easing: Easing.out(Easing.ease),
                  });
            translate.x.value = withDecay({
              velocity: -evt.velocityX,
            });
          }
        }
      },

      onStart: () => {
        if (!isPinch.value) {
          /**
           * Cancel any previous motion animation on translations when a touch
           * begins to interrupt the animation and take over the position handling
           */
          cancelAnimation(translate.x);
          cancelAnimation(translate.y);
          cancelAnimation(scale);
          offset.set(translate);
        }
        /**
         * Reset hasPinched for Android single finger offset
         */
        hasPinched.value = HasPinched.FALSE;
      },
    },
    [currentImageHeight, imageLength],
  );

  /**
   * On pinch is run when two or more fingers touch the screen, it then takes over
   * all touch handling even if the number of fingers is reduced to one until the
   * touch is complete
   */
  const onPinch = useAnimatedGestureHandler(
    {
      onActive: evt => {
        /**
         * Android starts with a zero event with 1 touch instead of two
         * we therefore must wait to capture starting info until the double
         * touch begins
         */
        if (!isPinch.value && isAndroid) {
          /**
           * Set hasPinched to true so when removing one finger the pan active
           * state adjusts the offset
           */
          hasPinched.value = HasPinched.TRUE;
          /**
           * Cancel any previous motion animation on translations when a touch
           * begins to interrupt the animation and take over the position handling
           */
          cancelAnimation(translate.x);
          cancelAnimation(translate.y);
          cancelAnimation(scale);
          /**
           * Reset isSwiping as now the pan gesture handler is no longer running
           */
          isSwiping.value = IsSwiping.UNDETERMINED;
          /**
           * Set initial values for pinch gesture interaction handler
           */
          numberOfPinchFingers.value = evt.numberOfPointers;
          offset.set(translate);
          adjustedFocal.set({
            x: evt.focalX - (halfScreenWidth + offset.x.value),
            y: evt.focalY - (halfScreenHeight + offset.y.value),
          });
          origin.set(adjustedFocal);
          offsetScale.value = scale.value;
        }
        /**
         * Set pinch to true to stop all pan gesture interactions, we do this
         * again here for Android outside the check that creates type
         */
        isPinch.value = true;
        /**
         * The scale is clamped to a minimum of MIN_SCALE and maximum of MAX_SCALE for aesthetics.
         * We use the clamped value to determine a local event scale so the focal
         * point does not become out of sync with the actual photo scaling, e.g.
         * evt.scale is 20 but scale is 8, using evt.scale for offset will put the
         * photo and calculations out of sync
         */
        scale.value = clamp(offsetScale.value * evt.scale, MIN_SCALE, MAX_SCALE);
        const localEvtScale = scale.value / offsetScale.value;

        /**
         * We calculate the adjusted focal point on the photo using the events
         * focal position on the screen, screen size, and current photo offset
         */
        adjustedFocal.set({
          x: evt.focalX - (halfScreenWidth + offset.x.value),
          y: evt.focalY - (halfScreenHeight + offset.y.value),
        });
        /**
         * If the number of fingers on the screen changes, the position of the
         * focal point will change and this needs to be accounted for, e.g. if
         * two fingers are on the screen the focal is between them, but if one is
         * then removed the focal is now at the remaining fingers touch position.
         * If this happens without accounting for the change the image will jump
         * around, we keep track of the previous two finger focal to adjust for this
         * change in a reduction from two fingers to one, then if another finger
         * is added again we adjust the origin to account for the difference between
         * the original two finger touch and the new two finger touch position.
         */
        if (numberOfPinchFingers.value !== evt.numberOfPointers) {
          numberOfPinchFingers.value = evt.numberOfPointers;
          if (evt.numberOfPointers === 1) {
            focalOffset.set({
              x: oldFocal.x.value - adjustedFocal.x.value,
              y: oldFocal.y.value - adjustedFocal.y.value,
            });
          } else if (numberOfPinchFingers.value > 1) {
            origin.subtract({
              x: oldFocal.x.value / localEvtScale - adjustedFocal.x.value / localEvtScale,
              y: oldFocal.y.value / localEvtScale - adjustedFocal.y.value / localEvtScale,
            });
          }
        }
        /**
         * If pinch handler has been activated via two fingers then the fingers
         * reduced to one we keep track of the old focal using the focal offset
         * from when the number of fingers was two. We then translate the photo
         * taking into account the offset, focal, focal offset, origin, and scale.
         */
        if (numberOfPinchFingers.value === 1) {
          oldFocal.set({
            x: adjustedFocal.x.value + focalOffset.x.value,
            y: adjustedFocal.y.value + focalOffset.y.value,
          });
          translate.set({
            x: offset.x.value + oldFocal.x.value - localEvtScale * origin.x.value,
            y: offset.y.value + oldFocal.y.value - localEvtScale * origin.y.value,
          });
          /**
           * If the number of fingers in the gesture is greater than one the
           * adjusted focal point is saved as the old focal and the photo is
           * translated taking into account the offset, focal, origin, and scale.
           */
        } else if (numberOfPinchFingers.value > 1) {
          oldFocal.set(adjustedFocal);
          translate.set({
            x: offset.x.value + adjustedFocal.x.value - localEvtScale * origin.x.value,
            y: offset.y.value + adjustedFocal.y.value - localEvtScale * origin.y.value,
          });
        }
      },
      onFinish: () => {
        if (isPinch.value) {
          /**
           * When the pinch is finished if the scale is less than 1 return the
           * photo to center, if the photo is inside the edges of the screen
           * return the photo to line up with the edges, otherwise leave the
           * photo in its current position
           */
          const rightEdge = halfScreenWidth * (scale.value - 1);
          const leftEdge = -halfScreenWidth * (scale.value - 1);
          if (scale.value < 1) {
            translate.x.value = withTiming(0);
          } else if (translate.x.value > rightEdge) {
            translate.x.value = withTiming(rightEdge);
          } else if (translate.x.value < leftEdge) {
            translate.x.value = withTiming(leftEdge);
          }
          /**
           * When the pinch is finished if the height is less than the screen
           * height return the photo to center, if the photo is inside the
           * edges of the screen return the photo to line up with the edges,
           * otherwise leave the photo in its current position
           */
          const topEdge = (currentImageHeight / 2) * scale.value - screenHeight / 2;
          const bottomEdge = (-currentImageHeight / 2) * scale.value + screenHeight / 2;
          if (currentImageHeight * scale.value < screenHeight) {
            translate.y.value = withTiming(0);
          } else if (translate.y.value > topEdge) {
            translate.y.value = withTiming(topEdge);
          } else if (translate.y.value < bottomEdge) {
            translate.y.value = withTiming(bottomEdge);
          }
          /**
           * If the scale has been reduced below one, i.e. zoomed out, translate
           * the zoom back to one
           */
          offsetScale.value = scale.value < 1 ? 1 : scale.value;
          scale.value = scale.value < 1 ? withTiming(1) : scale.value;
          resetTouchValues();
        }
      },
      onStart: evt => {
        /**
         * Android starts with a zero event with 1 touch instead of two
         * we therefore must wait to capture starting info until the double
         * touch begins
         */
        if (!isAndroid) {
          /**
           * Cancel any previous motion animation on translations when a touch
           * begins to interrupt the animation and take over the position handling
           */
          cancelAnimation(translate.x);
          cancelAnimation(translate.y);
          cancelAnimation(scale);
          /**
           * Set pinch to true to stop all pan gesture interactions
           */
          isPinch.value = true;
          /**
           * Reset isSwiping as now the pan gesture handler is no longer running
           */
          isSwiping.value = IsSwiping.UNDETERMINED;
          /**
           * Set initial values for pinch gesture interaction handler
           */
          numberOfPinchFingers.value = evt.numberOfPointers;
          offset.set(translate);
          adjustedFocal.set({
            x: evt.focalX - (halfScreenWidth + offset.x.value),
            y: evt.focalY - (halfScreenHeight + offset.y.value),
          });
          origin.set(adjustedFocal);
          offsetScale.value = scale.value;
        }
        /**
         * Reset hasPinched for Android single finger offset
         */
        hasPinched.value = HasPinched.FALSE;
      },
    },
    [currentImageHeight],
  );

  /**
   * Single tap handler for header hiding and showing
   */
  const onSingleTap = useAnimatedGestureHandler({
    onActive: () => {
      cancelAnimation(headerFooterVisible);
      headerFooterVisible.value = headerFooterVisible.value > 0 ? withTiming(0) : withTiming(1);
    },
  });

  /**
   * Double tap handler to zoom back out and hide header and footer
   */
  const onDoubleTap = useAnimatedGestureHandler({
    onActive: evt => {
      const hitSlop = 64;
      if (Math.abs(tap.x.value - evt.absoluteX) < hitSlop && Math.abs(tap.y.value - evt.absoluteY) < hitSlop) {
        if (offsetScale.value === 1 && offset.x.value === 0 && offset.y.value === 0) {
          offsetScale.value = 2;
          scale.value = withTiming(2, {
            duration: 200,
            easing: Easing.out(Easing.ease),
          });
          translate.x.value = withTiming(evt.absoluteX - halfScreenWidth, {
            duration: 200,
            easing: Easing.out(Easing.ease),
          });
          if (currentImageHeight * 2 > screenHeight) {
            const translateYTopBottom =
              evt.absoluteY > halfScreenHeight
                ? -(currentImageHeight * 2 - screenHeight) / 2
                : (currentImageHeight * 2 - screenHeight) / 2;
            translate.y.value = withTiming(translateYTopBottom, {
              duration: 200,
              easing: Easing.out(Easing.ease),
            });
          }
        } else {
          offsetScale.value = 1;
          scale.value = withTiming(1, {
            duration: 200,
            easing: Easing.out(Easing.ease),
          });
          offset.set({ x: 0, y: 0 });
          translate.x.value = withTiming(0, {
            duration: 200,
            easing: Easing.out(Easing.ease),
          });
          translate.y.value = withTiming(0, {
            duration: 200,
            easing: Easing.out(Easing.ease),
          });
          if (headerFooterVisible.value !== 0) {
            cancelAnimation(headerFooterVisible);
            headerFooterVisible.value = withTiming(0);
          }
        }
      }
    },
    onStart: evt => {
      tap.set({ x: evt.absoluteX, y: evt.absoluteY });
    },
  });

  /**
   * If the header is visible we scale down the opacity of it as the
   * image is swiped downward
   */
  const headerFooterOpacity = useDerivedValue(() => {
    if (currentImageHeight * scale.value < screenHeight && translate.y.value > 0) {
      return 1 - translate.y.value / quarterScreenHeight;
    }
    if (
      currentImageHeight * scale.value > screenHeight &&
      translate.y.value > (currentImageHeight / 2) * scale.value - halfScreenHeight
    ) {
      return (
        1 - (translate.y.value - ((currentImageHeight / 2) * scale.value - halfScreenHeight)) / quarterScreenHeight
      );
    }

    return 1;
  }, [currentImageHeight]);

  /**
   * This transition and scaleX reverse lets use scroll left
   */
  const wizardStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translationX.value }],
    }),
    [visible],
  );

  /**
   * Simple background color animation on Y movement
   */
  const containerBackgroundStyle = useAnimatedStyle(
    () => ({
      backgroundColor: 'black',
      opacity: headerFooterOpacity.value,
    }),
    [headerFooterOpacity],
  );

  /**
   * Show gallery style as component is always rendered we hide it
   * down and up and set opacity to 0 for good measure
   */
  const showGalleryStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(showScreen.value, [0, 0.01, 1], [0, 1, 1]),
      transform: [
        {
          translateY: interpolate(showScreen.value, [0, 1], [screenHeight, 0]),
        },
      ],
    }),
    [],
  );

  return {
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
    translationX,
    scale,
    offsetScale,
    selectedIndex,
  };
};

export default useImageGalleryGestures;
