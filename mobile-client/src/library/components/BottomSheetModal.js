import React, { useEffect, useMemo, useRef } from 'react';
import { BottomSheetModal as Modal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import { Outlines, Theme } from 'library/styles';
import { useAvoidKeyboard, useBackButton } from 'library/hooks';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const BottomSheetBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP),
  }));

  return <StyledBackdrop style={[containerAnimatedStyle, style]} />;
};

const BottomSheetModal = ({ active, onDismiss, children, outerChildren, animatedIndex, avoidKeyboard = true }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['60%', '87.5%'], []);
  useAvoidKeyboard({
    handleShow: () => {
      if (avoidKeyboard) bottomSheetModalRef.current?.expand();
    },
    handleHide: () => {
      if (avoidKeyboard) bottomSheetModalRef.current?.snapTo(0);
    },
  });

  useBackButton(() => {
    if (active) {
      bottomSheetModalRef.current?.dismiss();
      return true;
    }

    return false;
  });

  useEffect(() => {
    if (active) bottomSheetModalRef.current?.present();
    else bottomSheetModalRef.current?.dismiss();
  }, [active]);

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
