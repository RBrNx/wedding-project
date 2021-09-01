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
import { useMutation } from '@apollo/react-hooks';
import ADD_VENUE_DETAILS from 'library/graphql/mutations/addVenueDetails.graphql';
import BOOTSTRAP_QUERY from 'library/graphql/queries/bootstrapQuery.graphql';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from 'library/components/FormInput';
import { stripTypenames } from 'library/utils/stripTypenames';

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
        location: {
          latitude: null,
          longitude: null,
        },
      },
    },
  });

  useEffect(() => {
    if (active && venue) {
      const loadedVenue = {
        ...venue,
        location: {
          latitude: venue?.location?.latitude?.toString(),
          longitude: venue?.location?.longitude?.toString(),
        },
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

      const { data } = await addVenueDetails({
        variables: {
          input: {
            ...form.venue,
            location: {
              latitude: parseFloat(form.venue.location.latitude),
              longitude: parseFloat(form.venue.location.longitude),
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
            <FormInput name='venue.name' label='Venue Name' />
          </Card>
          <Spacer size={15} />
          <Card>
            <QuestionText>What are the town, country and postal code where the Venue is located?</QuestionText>
            <FormInput name='venue.address.town' label='Town' />
            <Spacer size={15} />
            <FormInput name='venue.address.country' label='Country' />
            <Spacer size={15} />
            <FormInput name='venue.address.postcode' label='Postal Code' />
          </Card>
          <Spacer size={15} />
          <Card>
            <QuestionText>How can your guests contact the Venue?</QuestionText>
            <FormInput name='venue.email' label='Email Address' />
            <Spacer size={15} />
            <FormInput name='venue.phone' label='Phone Number' />
          </Card>
          <Spacer size={15} />
          <Card>
            <QuestionText>What are the latitude and longitude of the Venue?</QuestionText>
            <FormInput name='venue.location.latitude' label='Latitude' />
            <Spacer size={15} />
            <FormInput name='venue.location.longitude' label='Longitude' />
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
