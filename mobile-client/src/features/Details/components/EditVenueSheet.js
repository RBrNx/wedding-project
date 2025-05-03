import React, { useEffect, useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import BottomSheetModal from 'library/components/BottomSheetModal';
import { useAvoidKeyboard, useBottomSheetActionButton } from 'library/hooks';
import { Feather } from '@expo/vector-icons';
import { useAlert } from 'context';
import { ActivityIndicator, Platform } from 'react-native';
import StandardActionButton from 'library/components/StandardActionButton';
import { useMutation } from '@apollo/react-hooks';
import ADD_VENUE_DETAILS from 'library/graphql/mutations/addVenueDetails.graphql';
import BOOTSTRAP_QUERY from 'library/graphql/queries/bootstrapQuery.graphql';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from 'library/components/FormInput';
import { stripTypenames } from 'library/utils/stripTypenames';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

const EditVenueSheet = ({ active, onDismiss, venue }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addVenueDetails] = useMutation(ADD_VENUE_DETAILS, { refetchQueries: [{ query: BOOTSTRAP_QUERY }] });
  const { sheetPosition, buttonAnimatedStyle } = useBottomSheetActionButton();
  const { showAlert } = useAlert();
  const { keyboardHeight } = useAvoidKeyboard();
  const formMethods = useForm({
    defaultValues: {
      venue: {
        name: null,
        address: {
          town: null,
          country: null,
          postcode: null,
        },
        email: null,
        phone: null,
        location: null,
      },
    },
  });

  useEffect(() => {
    if (active && venue) {
      const { location } = venue;
      const loadedVenue = {
        ...venue,
        location: `${location?.latitude}, ${location?.longitude}`,
      };
      formMethods.setValue('venue', stripTypenames(loadedVenue));
    }
  }, [active]);

  const onSheetDismiss = () => {
    onDismiss();
    resetState();
  };

  const resetState = () => {
    formMethods.reset();
    setIsSubmitting(false);
  };

  const saveDetails = async form => {
    try {
      setIsSubmitting(true);
      const [latitude, longitude] = form.venue.location.split(',');

      const { data } = await addVenueDetails({
        variables: {
          input: {
            ...form.venue,
            phone: parsePhoneNumber(form.venue.phone, 'GB').format('E.164'),
            location: {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            },
            image: undefined, // Until an image upload has been implemented
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
          onPress={formMethods.handleSubmit(saveDetails)}
        />
      }
    >
      <StyledBottomSheetScrollView keyboardHeight={keyboardHeight}>
        <Spacer size={15} />
        <ModalTitle>Venue Details 💒</ModalTitle>
        <Spacer size={45} />
        <FormProvider {...formMethods}>
          <Card>
            <QuestionText>What is the name of the Venue?</QuestionText>
            <FormInput
              name='venue.name'
              label='Venue Name'
              maxLength={50}
              rules={{ required: 'Please enter the name of your Wedding Venue' }}
            />
          </Card>
          <Spacer size={15} />
          <Card>
            <QuestionText>What is the address where the Venue is located?</QuestionText>
            <FormInput
              name='venue.address.town'
              label='Town'
              maxLength={50}
              rules={{ required: 'Please enter a Town name' }}
            />
            <Spacer size={15} />
            <FormInput
              name='venue.address.country'
              label='Country'
              maxLength={50}
              rules={{ required: 'Please enter a Country name' }}
            />
            <Spacer size={15} />
            <FormInput
              name='venue.address.postcode'
              label='Postal Code'
              maxLength={10}
              rules={{
                required: 'Please enter a valid Postcode',
                pattern: {
                  value: /^(([A-Z]{1,2}\d[A-Z\d]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?\d[A-Z]{2}|BFPO ?\d{1,4}|(KY\d|MSR|VG|AI)[ -]?\d{4}|[A-Z]{2} ?\d{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/,
                  message: 'Please check the format of your Postcode and try again',
                },
              }}
            />
            <Spacer size={30} />
            <QuestionText>What are the latitude and longitude of the Venue?</QuestionText>
            <FormInput
              name='venue.location'
              label='Coordinate Location'
              placeholder='55.8642, 4.2518'
              keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
              maxLength={50}
              rules={{
                required: `Please enter the coordinates of the Venue's location in the format: 'latitude, longitude'`,
                pattern: {
                  value: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
                  message: 'Please enter a valid coordinate format',
                },
              }}
            />
          </Card>
          <Spacer size={15} />
          <Card>
            <QuestionText>How can your guests contact the Venue?</QuestionText>
            <FormInput
              name='venue.email'
              label='Email Address'
              keyboardType='email-address'
              maxLength={50}
              rules={{
                required: 'Please enter the email address of the Venue',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter an email address in the correct format hello@domain.com',
                },
              }}
            />
            <Spacer size={15} />
            <FormInput
              name='venue.phone'
              label='Phone Number'
              keyboardType='phone-pad'
              maxLength={15}
              rules={{
                required: 'Please enter a contact number for the Venue',
                validate: v => isValidPhoneNumber(v, 'GB') || 'Please enter a valid phone number',
              }}
            />
          </Card>
        </FormProvider>
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
