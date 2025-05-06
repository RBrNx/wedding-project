import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Theme } from 'library/styles';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAvoidKeyboard, useSnapPoints } from 'library/hooks';
import Spacer from 'library/components/Spacer';
import { useDatastore } from 'context';
import EditVenueCard from './EditVenueCard';
import EditScheduleCard from './EditScheduleCard';
import EditMenuCard from './EditMenuCard';
import EditVenueSheet from './EditVenueSheet';
import EditScheduleSheet from './EditScheduleSheet';
import EditMenuSheet from './EditMenuSheet';

const EditDetailsView = ({ scrollPosition }) => {
  const bottomSheetRef = useRef(null);
  const [showEditVenueSheet, setShowEditVenueSheet] = useState(false);
  const [showEditScheduleSheet, setShowEditScheduleSheet] = useState(false);
  const [showEditMenuSheet, setShowEditMenuSheet] = useState(false);
  const { eventInfo } = useDatastore();
  const { keyboardHeight } = useAvoidKeyboard();
  const snapPoints = useSnapPoints();

  const onSheetDismiss = () => {
    setShowEditVenueSheet(false);
    setShowEditScheduleSheet(false);
    setShowEditMenuSheet(false);
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
          <EditScheduleCard schedule={eventInfo?.schedule} onPress={() => setShowEditScheduleSheet(true)} />
          <Spacer size={20} />
          <EditMenuCard menu={eventInfo?.menu} onPress={() => setShowEditMenuSheet(true)} />
        </StyledBottomSheetScrollView>
      </BottomSheet>
      <EditVenueSheet active={showEditVenueSheet} onDismiss={onSheetDismiss} venue={eventInfo?.venue} />
      <EditScheduleSheet active={showEditScheduleSheet} onDismiss={onSheetDismiss} schedule={eventInfo?.schedule} />
      <EditMenuSheet active={showEditMenuSheet} onDismiss={onSheetDismiss} menu={eventInfo?.menu} />
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
