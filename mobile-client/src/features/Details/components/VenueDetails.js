import React from 'react';
import styled from 'styled-components/native';
import Spacer from 'library/components/Spacer';
import * as Linking from 'expo-linking';
import VenueJPEG from 'assets/venue.jpeg';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import StandardPillPressable from 'library/components/StandardPillPressable';
import { Feather } from '@expo/vector-icons';
import theme from 'styled-theming';
import MapView, { Marker } from 'react-native-maps';

const VenueDetails = ({ venueName }) => {
  return (
    <Card>
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
      <Spacer size={15} />
      <MapContainer>
        <VenueMap
          provider='google'
          pitchEnabled={false}
          initialRegion={{
            latitude: 55.797401800863895,
            longitude: -4.5689032414826745,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker coordinate={{ latitude: 55.797401800863895, longitude: -4.5689032414826745 }} title={venueName} />
        </VenueMap>
      </MapContainer>
    </Card>
  );
};

const Card = styled.View`
  width: 100%;
  padding: 5%;
  background-color: ${theme('theme', {
    light: Colours.neutral.offWhite,
    dark: Colours.neutral.grey5,
  })};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
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
  height: 200px;
  width: 100%;
  resize-mode: contain;
  ${Outlines.borderRadius};
`;

const MapContainer = styled.View`
  ${Outlines.borderRadius};
  overflow: hidden;
`;

const VenueMap = styled(MapView)`
  height: 200px;
  width: 100%;
  ${Outlines.borderRadius};
  overflow: hidden;
`;

export default VenueDetails;
