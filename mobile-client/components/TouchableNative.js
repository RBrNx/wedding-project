import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';

const TouchableNative = ({ style, children, onPress, ...otherProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TouchableNativeFeedback {...otherProps}>
    <View style={style}>{children}</View>
  </TouchableNativeFeedback>
);

export default TouchableNative;
