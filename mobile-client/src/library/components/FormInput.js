import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import React, { useCallback } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { Switch } from 'react-native';
import StandardEnumSelect from './StandardEnumSelect';
import StandardTextInput from './StandardTextInput';

const FormInput = ({ name, rules, defaultValue = '', type, ...inputProps }) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control, rules, defaultValue });
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  const handleOnFocus = useCallback(() => {
    shouldHandleKeyboardEvents.value = true;
  }, [shouldHandleKeyboardEvents]);
  const handleOnBlur = useCallback(() => {
    shouldHandleKeyboardEvents.value = false;
  }, [shouldHandleKeyboardEvents]);

  if (type === 'EnumSelect') {
    return <StandardEnumSelect value={field.value} onSelect={field.onChange} enumObject={inputProps.enumObject} />;
  }

  if (type === 'Switch') {
    return <Switch value={field.value} onValueChange={field.onChange} />;
  }

  return (
    <StandardTextInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...inputProps}
      onChangeText={field.onChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      value={field.value}
    />
  );
};

export default FormInput;
