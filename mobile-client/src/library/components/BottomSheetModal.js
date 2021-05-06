import React, { useEffect, useMemo, useRef } from 'react';
import { BottomSheetModal as Modal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import { Outlines, Theme } from 'library/styles';
import { useBackButton } from 'library/hooks';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const BottomSheetBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP),
  }));

  return <StyledBackdrop style={[containerAnimatedStyle, style]} />;
};

const BottomSheetModal = ({ active, onDismiss, children, outerChildren, animatedIndex }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['60%', '87.5%'], []);

  useBackButton(() => {
    if (active) {
      // eslint-disable-next-line no-unused-expressions
      bottomSheetModalRef.current?.dismiss();
      return true;
    }

    return false;
  });

  /* eslint-disable no-unused-expressions */
  useEffect(() => {
    if (active) bottomSheetModalRef.current?.present();
    else bottomSheetModalRef.current?.dismiss();
  }, [active]);
  /* eslint-enable no-unused-expressions */

  return (
    <BottomSheetModalProvider>
      <StyledBottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onDismiss={onDismiss}
        backgroundComponent={BottomSheetBackground}
        backdropComponent={BottomSheetBackdrop}
        animatedIndex={animatedIndex}
      >
        {children}
      </StyledBottomSheetModal>
      {active && outerChildren}
    </BottomSheetModalProvider>
  );
};

const StyledBottomSheetModal = styled(Modal)`
  ${Outlines.boxShadow};
`;

const BottomSheetBackground = styled.View`
  background-color: ${Theme.background};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const StyledBackdrop = styled(Animated.View)`
  background-color: rgba(0, 0, 0, 0.8);
`;

export default BottomSheetModal;
