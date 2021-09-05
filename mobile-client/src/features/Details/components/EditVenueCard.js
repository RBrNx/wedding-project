import React from 'react';
import styled from 'styled-components/native';
import Spacer from 'library/components/Spacer';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import StandardButton from 'library/components/StandardButton';
import StandardPressable from 'library/components/StandardPressable';
import { AntDesign } from '@expo/vector-icons';
import theme from 'styled-theming';
// import GoogleMapsView from './GoogleMapsView';

const EditVenueCard = ({ venue, onPress }) => {
  const { name, address, email, phone } = venue || {};

  return (
    <Card>
      <HeadingContainer>
        <HeadingText>Wedding Venue</HeadingText>
        {venue && (
          <EditButton size={40} onPress={onPress}>
            <EditIcon name='edit' size={25} />
          </EditButton>
        )}
      </HeadingContainer>
      <Spacer size={25} />
      {!venue && (
        <EmptyContainer>
          <EmptyDescription>Let your guests know where the big day is taking place 💒</EmptyDescription>
          <Spacer size={30} />
          <StandardButton text='Add Venue Details' outline onPress={onPress} />
        </EmptyContainer>
      )}
      {venue && (
        <>
          <VenueName>{name}</VenueName>
          <VenueInfo>{`${address.town}, ${address.country}, ${address.postcode}`}</VenueInfo>
          <Spacer size={15} />
          <VenueInfo>{email}</VenueInfo>
          <VenueInfo>{phone}</VenueInfo>
          <Spacer size={15} />
          {/* <GoogleMapsView latitude={location.latitude} longitude={location.longitude} title={name} /> */}
        </>
      )}
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

const HeadingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeadingText = styled.Text`
  ${Typography.h3};
  color: ${Theme.headerTextColour};
`;

const EditButton = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  ${Layout.flexCenter};
  ${props => Layout.round(props.size)}
`;

const EditIcon = styled(AntDesign)`
  color: ${Theme.icon};
`;

const EmptyContainer = styled.View`
  ${Layout.flexCenter};
`;

const EmptyDescription = styled.Text`
  ${Typography.h4};
  color: ${Theme.headerTextColour};
  text-align: center;
`;

const VenueName = styled.Text`
  ${Typography.h4};
  ${Typography.boldFont};
  color: ${Theme.bodyTextColour};
`;

const VenueInfo = styled.Text`
  ${Typography.body};
  color: ${Theme.detailTextColour};
`;

export default EditVenueCard;
