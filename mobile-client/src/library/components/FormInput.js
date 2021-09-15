/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { Switch } from 'react-native';
import StandardEnumSelect from './StandardEnumSelect';
import StandardSelectInput from './StandardSelectInput';
import StandardTextInput from './StandardTextInput';

const FormInput = ({ name, rules, defaultValue = '', type, ...inputProps }) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control, rules, defaultValue });

  if (type === 'EnumSelect') {
    return <StandardEnumSelect value={field.value} onSelect={field.onChange} enumObject={inputProps.enumObject} />;
  }

  if (type === 'Switch') {
    return <Switch value={field.value} onValueChange={field.onChange} />;
  }

  if (type === 'Select') {
    return <StandardSelectInput {...inputProps} value={field.value} onChange={field.onChange} />;
  }

  return <StandardTextInput {...inputProps} onChangeText={field.onChange} value={field.value} />;
};

export default FormInput;
