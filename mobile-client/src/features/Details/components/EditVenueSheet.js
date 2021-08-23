import React, { useEffect, useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import BottomSheetModal from 'library/components/BottomSheetModal';
import { useAvoidKeyboard, useBottomSheetActionButton } from 'library/hooks';
import { Feather } from '@expo/vector-icons';
import { useAlert } from 'context';
import { ActivityIndicator } from 'react-native';
import StandardActionButton from 'library/components/StandardActionButton';
import StandardTextInput from 'library/components/StandardTextInput';
import { useMutation } from '@apollo/react-hooks';
import ADD_VENUE_DETAILS from 'library/graphql/mutations/addVenueDetails.graphql';
import BOOTSTRAP_QUERY from 'library/graphql/queries/bootstrapQuery.graphql';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';

const EditVenueSheet = ({ active, onDismiss, venue }) => {
  const [name, setName] = useState(null);
  const [town, setTown] = useState(null);
  const [country, setCountry] = useState(null);
  const [postcode, setPostcode] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addVenueDetails] = useMutation(ADD_VENUE_DETAILS, { refetchQueries: [{ query: BOOTSTRAP_QUERY }] });
  const { sheetPosition, buttonAnimatedStyle } = useBottomSheetActionButton();
  const { showAlert } = useAlert();
  const { keyboardHeight } = useAvoidKeyboard();

  useEffect(() => {
    if (active && venue) {
      setName(venue.name);
      setTown(venue.address.town);
      setCountry(venue.address.country);
      setPostcode(venue.address.postcode);
      setEmail(venue.email);
      setPhone(venue.phone);
      setLatitude(venue.location.latitude.toString());
      setLongitude(venue.location.longitude.toString());
    }
  }, [active]);

  const onSheetDismiss = () => {
    onDismiss();
    resetState();
  };

  const resetState = () => {
    setName(null);
    setTown(null);
    setCountry(null);
    setPostcode(null);
    setEmail(null);
    setPhone(null);
    setLatitude(null);
    setLongitude(null);
    setIsSubmitting(false);
  };

  const saveDetails = async () => {
    try {
      setIsSubmitting(true);

      const { data } = await addVenueDetails({
        variables: {
          input: {
            name,
            address: {
              town,
              country,
              postcode,
            },
            email,
            phone,
            location: {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            },
          },
        },
      });

      const { success } = data?.addVenueDetails;

      if (success) onSheetDismiss();
      else setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      const { message } = parseError(error);
      console.log(message, error);
      showAlert({ message, type: AlertType.WARNING });
    }
  };

  return (
    <BottomSheetModal
      active={active}
      onDismiss={onSheetDismiss}
      animatedIndex={sheetPosition}
      outerChildren={
        <StandardActionButton
          label='Save Details'
          icon={isSubmitting ? <ActivityIndicator color='#fff' /> : <StyledIcon name='save' size={22} />}
          containerStyle={{ zIndex: 99 }}
          style={buttonAnimatedStyle}
          onPress={saveDetails}
        />
      }
    >
      <StyledBottomSheetScrollView keyboardHeight={keyboardHeight}>
        <Spacer size={15} />
        <ModalTitle>Venue Details 💒</ModalTitle>
        <Spacer size={45} />
        <Card>
          <QuestionText>What is the name of the Venue?</QuestionText>
          <StandardTextInput label='Venue Name' value={name} onChangeText={value => setName(value)} />
        </Card>
        <Spacer size={15} />
        <Card>
          <QuestionText>What are the town, country and postal code where the Venue is located?</QuestionText>
          <StandardTextInput label='Town' value={town} onChangeText={value => setTown(value)} />
          <Spacer size={15} />
          <StandardTextInput label='Country' value={country} onChangeText={value => setCountry(value)} />
          <Spacer size={15} />
          <StandardTextInput label='Postal Code' value={postcode} onChangeText={value => setPostcode(value)} />
        </Card>
        <Spacer size={15} />
        <Card>
          <QuestionText>How can your guests contact the Venue?</QuestionText>
          <StandardTextInput label='Email Address' value={email} onChangeText={value => setEmail(value)} />
          <Spacer size={15} />
          <StandardTextInput label='Phone Number' value={phone} onChangeText={value => setPhone(value)} />
        </Card>
        <Spacer size={15} />
        <Card>
          <QuestionText>What are the latitude and longitude of the Venue?</QuestionText>
          <StandardTextInput label='Latitude' value={latitude} onChangeText={value => setLatitude(value)} />
          <Spacer size={15} />
          <StandardTextInput label='Longitude' value={longitude} onChangeText={value => setLongitude(value)} />
        </Card>
        <Spacer size={15} />
      </StyledBottomSheetScrollView>
    </BottomSheetModal>
  );
};

const StyledBottomSheetScrollView = styled(BottomSheetScrollView).attrs(props => ({
  contentContainerStyle: {
    paddingHorizontal: '5%',
    paddingBottom: props.keyboardHeight,
  },
}))``;

const StyledIcon = styled(Feather)`
  color: ${Colours.neutral.white};
`;

const ModalTitle = styled.Text`
  ${Typography.h1};
  font-size: 28px;
  color: ${Theme.headerTextColour};
`;

const Card = styled.View`
  width: 100%;
  padding: 5%;
  margin-bottom: 10px;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const QuestionText = styled.Text`
  ${Typography.h4};
  color: ${Theme.headerTextColour};
  ${Typography.regularFont}
  margin-left: 5px;
  margin-bottom: 10px;
`;

export default EditVenueSheet;
