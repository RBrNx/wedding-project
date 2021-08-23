import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import StandardTextInput from './StandardTextInput';

const FormInput = ({ name, rules, defaultValue = '', ...inputProps }) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control, rules, defaultValue });

  return (
    <StandardTextInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...inputProps}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
    />
  );
};

export default FormInput;