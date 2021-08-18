import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useSnapPoints } from 'library/hooks';
import { Outlines, Theme, Typography } from 'library/styles';
import React, { useRef } from 'react';
import styled from 'styled-components/native';
import Spacer from 'library/components/Spacer';
import VenueDetails from './VenueDetails';

const DetailsList = ({ scrollPosition, venueName }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useSnapPoints(['15%', '45%', '83%']);

  return (
    <StyledBottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundComponent={BottomSheetBackground}
      animatedPosition={scrollPosition}
      enableOverDrag={false}
    >
      <StyledScrollView>
        <VenueDetails venueName={venueName} />
        <Spacer size={45} />
      </StyledScrollView>
    </StyledBottomSheet>
  );
};

const StyledScrollView = styled(BottomSheetScrollView).attrs(() => ({
  contentContainerStyle: {
    flex: 1,
    paddingHorizontal: '5%',
  },
}))``;

const StyledBottomSheet = styled(BottomSheet)`
  ${Outlines.bottomSheetShadow};
`;

const HeadingText = styled.Text`
  ${Typography.h3};
  color: ${Theme.headerTextColour};
`;

const EventText = styled.Text`
  ${Typography.h4};
  color: ${Theme.bodyTextColour};
`;

const BottomSheetBackground = styled.View`
  background-color: ${Theme.background};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

export default DetailsList;
