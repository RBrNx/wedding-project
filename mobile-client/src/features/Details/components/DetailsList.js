import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useSnapPoints } from 'library/hooks';
import { Layout, Outlines, Theme, Typography } from 'library/styles';
import React, { useRef } from 'react';
import styled from 'styled-components/native';
import StandardPillPressable from 'library/components/StandardPillPressable';
import Spacer from 'library/components/Spacer';
import * as Linking from 'expo-linking';
import VenueJPEG from 'assets/venue.jpeg';

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
        <VenueName>{venueName}</VenueName>
        <VenueLocation>Howwood, Scotland, PA9 1DZ</VenueLocation>
        <Spacer size={15} />
        <ContactContainer>
          <ContactButton
            text='Phone'
            icon={() => <Feather name='phone' size={14} />}
            onPress={() => Linking.openURL(`tel:01505705225`)}
          />
          <Spacer size={15} />
          <ContactButton
            text='Email'
            icon={() => <Feather name='mail' size={14} />}
            onPress={() => Linking.openURL(`mailto:reception@bowfieldhotel.co.uk`)}
          />
        </ContactContainer>
        <Spacer size={15} />
        <VenueImage source={VenueJPEG} />
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

const VenueName = styled.Text`
  ${Typography.h2};
  color: ${Theme.headerTextColour};
`;

const VenueLocation = styled.Text`
  ${Typography.h4};
  color: ${Theme.bodyTextColour};
`;

const ContactContainer = styled.View`
  flex-direction: row;
`;

const ContactButton = styled(StandardPillPressable).attrs(props => ({
  colour: Theme.icon(props),
}))`
  flex: 1;
  padding: 8px;
  ${Layout.flexCenter}
`;

const VenueImage = styled.Image`
  flex: 0.55;
  width: 100%;
  resize-mode: contain;
  ${Outlines.borderRadius};
`;

const BottomSheetBackground = styled.View`
  background-color: ${Theme.background};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

export default DetailsList;
