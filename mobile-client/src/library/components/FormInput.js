/* eslint-disable react/jsx-props-no-spreading */
import { Colours, Outlines, Theme } from 'library/styles';
import React from 'react';
import { useFormContext, useController, useFormState, get } from 'react-hook-form';
import { Switch } from 'react-native';
import styled from 'styled-components';
import StandardEnumSelect from './StandardEnumSelect';
import StandardSelectInput from './StandardSelectInput';
import StandardTextInput from './StandardTextInput';

const FormInput = ({ name, rules, defaultValue = '', type = 'Text', ...inputProps }) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control, rules, defaultValue });
  const { errors } = useFormState({ control });

  const error = get(errors, name);

  return (
    <Container>
      <>
        {type === 'EnumSelect' && (
          <StandardEnumSelect value={field.value} onSelect={field.onChange} enumObject={inputProps.enumObject} />
        )}
        {type === 'Switch' && <Switch value={field.value} onValueChange={field.onChange} />}
        {type === 'Select' && (
          <StandardSelectInput {...inputProps} value={field.value} onChange={field.onChange} error={!!error} />
        )}
        {type === 'Text' && (
          <StandardTextInput {...inputProps} onChangeText={field.onChange} value={field.value} error={!!error} />
        )}
      </>
      {!!error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ErrorMessage = styled.Text`
  margin-top: 5px;
  background-color: ${Colours.warning};
  padding: 2.5%;
  color: ${Theme.card};
  ${Outlines.borderRadius};
`;

export default FormInput;
