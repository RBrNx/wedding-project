/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View } from 'react-native';

const Spacer = ({ size, axis, style, ...rest }) => {
  const width = axis === 'vertical' ? 1 : size;
  const height = axis === 'horizontal' ? 1 : size;

  return (
    <View
      style={{
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...style,
      }}
      {...rest}
    />
  );
};
export default Spacer;
