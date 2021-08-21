import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Theme } from 'library/styles';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAvoidKeyboard, useSnapPoints } from 'library/hooks';
import Spacer from 'library/components/Spacer';
import { useAuth } from 'context';
import EditVenueCard from './EditVenueCard';
import EditScheduleCard from './EditScheduleCard';
import EditMenuCard from './EditMenuCard';
import EditVenueSheet from './EditVenueSheet';

const EditDetailsView = ({ scrollPosition }) => {
  const bottomSheetRef = useRef(null);
  const [showEditVenueSheet, setShowEditVenueSheet] = useState(false);
  const { eventInfo } = useAuth();
  const { keyboardHeight } = useAvoidKeyboard();
  const snapPoints = useSnapPoints();

  const onSheetDismiss = () => {
    setShowEditVenueSheet(false);
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundComponent={BottomSheetBackground}
        animatedPosition={scrollPosition}
        enableOverDrag={false}
      >
        <StyledBottomSheetScrollView keyboardHeight={keyboardHeight}>
          <EditVenueCard venue={eventInfo?.venue} onPress={() => setShowEditVenueSheet(true)} />
          <Spacer size={20} />
          <EditScheduleCard />
          <Spacer size={20} />
          <EditMenuCard />
        </StyledBottomSheetScrollView>
      </BottomSheet>
      <EditVenueSheet active={showEditVenueSheet} onDismiss={onSheetDismiss} venue={eventInfo?.venue} />
    </>
  );
};

const BottomSheetBackground = styled.View`
  background-color: ${Theme.background};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const StyledBottomSheetScrollView = styled(BottomSheetScrollView).attrs(props => ({
  contentContainerStyle: {
    paddingHorizontal: '5%',
    paddingBottom: props.keyboardHeight || 20,
  },
}))``;

export default EditDetailsView;
