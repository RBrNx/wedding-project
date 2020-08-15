/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Platform, TouchableNativeFeedback, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const TouchableNative = ({ style, children, onPress, ...otherProps }) => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress} {...otherProps}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableHighlight onPress={onPress} {...otherProps} underlayColor='#DDDDDD'>
      <View style={style}>{children}</View>
    </TouchableHighlight>
  );
};

export default TouchableNative;
