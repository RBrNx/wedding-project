import React, { useEffect, useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import BottomSheetModal from 'library/components/BottomSheetModal';
import { useBottomSheetActionButton } from 'library/hooks';
import { Feather } from '@expo/vector-icons';
import { useAlert } from 'context';
import { ActivityIndicator } from 'react-native';
import StandardActionButton from 'library/components/StandardActionButton';
import { useMutation } from '@apollo/react-hooks';
import ADD_MENU_DETAILS from 'library/graphql/mutations/addMenuDetails.graphql';
import BOOTSTRAP_QUERY from 'library/graphql/queries/bootstrapQuery.graphql';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';
import StandardPressable from 'library/components/StandardPressable';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import FormInput from 'library/components/FormInput';
import { stripTypenames } from 'library/utils/stripTypenames';

const MenuChoiceForm = ({ courseIndex, control }) => {
  const { fields, append } = useFieldArray({
    control,
    name: `menu.${courseIndex}.choices`,
  });

  return (
    <>
      {fields.map((choice, choiceIndex) => (
        <React.Fragment key={choice.id}>
          <FormInput
            name={`menu.${courseIndex}.choices.${choiceIndex}.name`}
            label={`Choice ${choiceIndex + 1} name`}
            maxLength={100}
            rules={{ required: 'Please enter a name for this Menu item' }}
          />
          <Spacer size={15} />
          <FormInput
            name={`menu.${courseIndex}.choices.${choiceIndex}.description`}
            label={`Choice ${choiceIndex + 1} description`}
            maxLength={150}
            rules={{ required: 'Please enter a description for this Menu item' }}
          />
          <Spacer size={15} />
        </React.Fragment>
      ))}
      <AddChoiceButton onPress={() => append({ name: null, description: null })}>
        <AddChoiceIcon name='plus' size={18} />
        <ButtonText>Add Choice</ButtonText>
      </AddChoiceButton>
    </>
  );
};

const EditMenuSheet = ({ active, onDismiss, menu }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addMenuDetails] = useMutation(ADD_MENU_DETAILS, { refetchQueries: [{ query: BOOTSTRAP_QUERY }] });
  const { sheetPosition, buttonAnimatedStyle } = useBottomSheetActionButton();
  const { showAlert } = useAlert();
  const formMethods = useForm({
    defaultValues: {
      menu: [
        { name: 'Starter', info: null, choices: [{ name: null, description: null }] },
        { name: 'Main', info: null, choices: [{ name: null, description: null }] },
        { name: 'Dessert', info: null, choices: [{ name: null, description: null }] },
      ],
    },
  });
  const { fields } = useFieldArray({
    control: formMethods.control,
    name: 'menu',
  });

  useEffect(() => {
    if (active && menu) {
      formMethods.setValue('menu', stripTypenames(menu));
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

  const saveMenu = async form => {
    try {
      setIsSubmitting(true);

      const { data } = await addMenuDetails({
        variables: {
          input: {
            menu: form.menu,
          },
        },
      });
      const { success } = data?.addMenuDetails;

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
          onPress={formMethods.handleSubmit(saveMenu)}
        />
      }
    >
      <StyledBottomSheetScrollView keyboardHeight={0}>
        <Spacer size={15} />
        <ModalTitle>Menu Choices 🍽️</ModalTitle>
        <Spacer size={45} />
        <FormProvider {...formMethods}>
          {fields.map((course, courseIndex) => {
            const { name } = course;

            return (
              <React.Fragment key={course.id}>
                <Card>
                  <CardTitle>{name}</CardTitle>
                  <Spacer size={15} />
                  <FormInput name={`menu.${courseIndex}.info`} label='Course Info (Optional)' maxLength={150} />
                  <Spacer size={25} />
                  <ChoiceTitle>Choices</ChoiceTitle>
                  <MenuChoiceForm courseIndex={courseIndex} control={formMethods.control} />
                </Card>
                <Spacer size={15} />
              </React.Fragment>
            );
          })}
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

const CardTitle = styled.Text`
  ${Typography.h4};
  color: ${Theme.headerTextColour};
  ${Typography.regularFont}
  margin-left: 5px;
  margin-bottom: 10px;
`;

const ChoiceTitle = styled.Text`
  ${Typography.body};
  color: ${Theme.bodyTextColour};
  ${Typography.regularFont}
  margin-left: 5px;
  margin-bottom: 10px;
`;

const AddChoiceButton = styled(StandardPressable).attrs(props => ({
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

const AddChoiceIcon = styled(Feather)`
  color: ${Colours.secondary};
`;

const ButtonText = styled.Text`
  ${Typography.body};
  ${Typography.boldFont};
  color: ${Colours.secondary};
`;

export default EditMenuSheet;
