import React from 'react';
import styled from 'styled-components/native';
import Spacer from 'library/components/Spacer';
import * as Linking from 'expo-linking';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import StandardPillPressable from 'library/components/StandardPillPressable';
import { Feather } from '@expo/vector-icons';
import theme from 'styled-theming';
import GoogleMapsView from './GoogleMapsView';

const VenueDetails = ({ venue }) => {
  const { name, address, email, phone, location, image } = venue || {};
  const { town, country, postcode } = address || {};
  const { latitude, longitude } = location || {};

  return (
    <Card>
      <VenueName>{name}</VenueName>
      <VenueLocation>{`${town}, ${country}, ${postcode}`}</VenueLocation>
      <Spacer size={15} />
      <ContactContainer>
        <ContactButton
          text='Phone'
          icon={() => <Feather name='phone' size={14} />}
          onPress={() => Linking.openURL(`tel:${phone}`)}
        />
        <Spacer size={15} />
        <ContactButton
          text='Email'
          icon={() => <Feather name='mail' size={14} />}
          onPress={() => Linking.openURL(`mailto:${email}`)}
        />
      </ContactContainer>
      <Spacer size={15} />
      <VenueImage source={{ uri: image }} />
      <Spacer size={15} />
      {latitude && longitude && <GoogleMapsView latitude={latitude} longitude={longitude} title={name} />}
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

export default VenueDetails;
