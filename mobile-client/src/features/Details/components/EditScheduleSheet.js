import React, { useEffect, useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import BottomSheetModal from 'library/components/BottomSheetModal';
import { useAvoidKeyboard, useBottomSheetActionButton } from 'library/hooks';
import { Feather } from '@expo/vector-icons';
import { useAlert } from 'context';
import { ActivityIndicator } from 'react-native';
import StandardActionButton from 'library/components/StandardActionButton';
import { useMutation } from '@apollo/react-hooks';
import ADD_SCHEDULE_DETAILS from 'library/graphql/mutations/addScheduleDetails.graphql';
import BOOTSTRAP_QUERY from 'library/graphql/queries/bootstrapQuery.graphql';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';
import StandardPressable from 'library/components/StandardPressable';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import FormInput from 'library/components/FormInput';
import { stripTypenames } from 'library/utils/stripTypenames';

const EditScheduleSheet = ({ active, onDismiss, schedule }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addScheduleDetails] = useMutation(ADD_SCHEDULE_DETAILS, { refetchQueries: [{ query: BOOTSTRAP_QUERY }] });
  const { sheetPosition, buttonAnimatedStyle } = useBottomSheetActionButton();
  const { showAlert } = useAlert();
  const { keyboardHeight } = useAvoidKeyboard();
  const formMethods = useForm({
    defaultValues: {
      schedule: [{ name: null, time: null }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'schedule',
  });

  useEffect(() => {
    if (active && schedule) {
      formMethods.setValue('schedule', stripTypenames(schedule));
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

  const addScheduleEvent = () => {
    append({ name: null, time: null });
  };

  const deleteScheduleEvent = eventIndex => {
    remove(eventIndex);
  };

  const saveSchedule = async form => {
    try {
      setIsSubmitting(true);

      const newSchedule = [...form.schedule].sort((a, b) => a.time.localeCompare(b.time));

      const { data } = await addScheduleDetails({
        variables: {
          input: {
            schedule: newSchedule,
          },
        },
      });
      const { success } = data?.addScheduleDetails;

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
          onPress={formMethods.handleSubmit(saveSchedule)}
        />
      }
    >
      <StyledBottomSheetScrollView keyboardHeight={keyboardHeight}>
        <Spacer size={15} />
        <ModalTitle>Schedule Details 🍾</ModalTitle>
        <Spacer size={45} />
        <FormProvider {...formMethods}>
          {fields.map((scheduleItem, index) => {
            return (
              <React.Fragment key={scheduleItem.id}>
                <Card>
                  <TitleContainer>
                    <CardTitle>{`Event ${index + 1}`}</CardTitle>
                    <DeleteButton size={40} onPress={() => deleteScheduleEvent(index)}>
                      <TrashIcon name='trash-2' size={25} />
                    </DeleteButton>
                  </TitleContainer>
                  <Spacer size={15} />
                  <FormInput
                    name={`schedule.${index}.time`}
                    label='Time'
                    placeholder='09:00'
                    rules={{
                      required: 'Please enter a time for this Event',
                      pattern: {
                        value: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Please enter a time in the format HH:MM, e.g',
                      },
                    }}
                  />
                  <Spacer size={15} />
                  <FormInput
                    name={`schedule.${index}.name`}
                    label='Name'
                    maxLength={100}
                    rules={{ required: 'Please enter a name for this Event' }}
                  />
                </Card>
                <Spacer size={15} />
              </React.Fragment>
            );
          })}
        </FormProvider>
        <AddScheduleItemButton onPress={addScheduleEvent}>
          <AddScheduleItemIcon name='plus' size={18} />
          <ButtonText>Add Event</ButtonText>
        </AddScheduleItemButton>
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

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.Text`
  ${Typography.h4};
  color: ${Theme.headerTextColour};
  ${Typography.regularFont}
  margin-left: 5px;
  margin-bottom: 10px;
`;

const AddScheduleItemButton = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  flex-direction: row;
  padding: 5%;
  background-color: ${Theme.card};
  ${Layout.flexCenter};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const AddScheduleItemIcon = styled(Feather)`
  color: ${Colours.secondary};
`;

const ButtonText = styled.Text`
  ${Typography.body};
  ${Typography.boldFont};
  color: ${Colours.secondary};
`;

const DeleteButton = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  ${Layout.flexCenter};
  ${props => Layout.round(props.size)}
`;

const TrashIcon = styled(Feather)`
  color: ${Theme.icon};
`;

export default EditScheduleSheet;
