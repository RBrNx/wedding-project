import React from 'react';
import styled from 'styled-components/native';
import Spacer from 'library/components/Spacer';
import * as Linking from 'expo-linking';
import VenueJPEG from 'assets/venue.jpeg';
import { Layout, Outlines, Theme, Typography } from 'library/styles';
import StandardPillPressable from 'library/components/StandardPillPressable';
import { Feather } from '@expo/vector-icons';

const VenueDetails = ({ venueName }) => {
  return (
    <>
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
    </>
  );
};

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
  flex: 1;
  width: 100%;
  resize-mode: contain;
  ${Outlines.borderRadius};
`;

export default VenueDetails;
