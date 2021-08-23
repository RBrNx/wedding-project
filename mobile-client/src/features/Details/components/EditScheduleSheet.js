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
import StandardTextInput from 'library/components/StandardTextInput';
import { useMutation } from '@apollo/react-hooks';
import ADD_SCHEDULE_DETAILS from 'library/graphql/mutations/addScheduleDetails.graphql';
import BOOTSTRAP_QUERY from 'library/graphql/queries/bootstrapQuery.graphql';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';
import StandardPressable from 'library/components/StandardPressable';
import { nanoid } from 'nanoid';

const EditScheduleSheet = ({ active, onDismiss, schedule }) => {
  const [scheduleState, setScheduleState] = useState({ [nanoid()]: { name: null, time: null } });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addScheduleDetails] = useMutation(ADD_SCHEDULE_DETAILS, { refetchQueries: [{ query: BOOTSTRAP_QUERY }] });
  const { sheetPosition, buttonAnimatedStyle } = useBottomSheetActionButton();
  const { showAlert } = useAlert();
  const { keyboardHeight } = useAvoidKeyboard();

  useEffect(() => {
    if (active && schedule) {
      const currentSchedule = Object.fromEntries(schedule.map(({ name, time }) => [nanoid(), { name, time }]));
      setScheduleState(currentSchedule);
    }
  }, [active]);

  const onSheetDismiss = () => {
    onDismiss();
    resetState();
  };

  const resetState = () => {
    setScheduleState({ [nanoid()]: { name: null, time: null } });
    setIsSubmitting(false);
  };

  const addScheduleEvent = () => {
    setScheduleState({ ...scheduleState, [nanoid()]: { name: null, time: null } });
  };

  const deleteScheduleEvent = scheduleEventId => {
    const filteredSchedule = Object.fromEntries(Object.entries(scheduleState).filter(([id]) => id !== scheduleEventId));
    setScheduleState(filteredSchedule);
  };

  const saveSchedule = async () => {
    try {
      setIsSubmitting(true);

      const { data } = await addScheduleDetails({
        variables: {
          input: {
            schedule: Object.values(scheduleState).sort((a, b) => a.time.localeCompare(b.time)),
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
          onPress={saveSchedule}
        />
      }
    >
      <StyledBottomSheetScrollView keyboardHeight={keyboardHeight}>
        <Spacer size={15} />
        <ModalTitle>Schedule Details 🍾</ModalTitle>
        <Spacer size={45} />
        {Object.entries(scheduleState).map(([scheduleItemId, scheduleItem], index) => {
          const { time, name } = scheduleItem;

          return (
            <React.Fragment key={scheduleItemId}>
              <Card>
                <TitleContainer>
                  <CardTitle>{`Event ${index + 1}`}</CardTitle>
                  <DeleteButton size={40} onPress={() => deleteScheduleEvent(scheduleItemId)}>
                    <TrashIcon name='trash-2' size={25} />
                  </DeleteButton>
                </TitleContainer>
                <Spacer size={15} />
                <StandardTextInput
                  label='Time'
                  value={time}
                  placeholder='09:00'
                  onChangeText={value =>
                    setScheduleState({
                      ...scheduleState,
                      [scheduleItemId]: { ...scheduleState[scheduleItemId], time: value },
                    })
                  }
                />
                <Spacer size={15} />
                <StandardTextInput
                  label='Name'
                  value={name}
                  onChangeText={value =>
                    setScheduleState({
                      ...scheduleState,
                      [scheduleItemId]: { ...scheduleState[scheduleItemId], name: value },
                    })
                  }
                />
              </Card>
              <Spacer size={15} />
            </React.Fragment>
          );
        })}
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
