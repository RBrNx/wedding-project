import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { version } from '../../package.json';

const AppVersion = ({ style }) => {
  const versionString = __DEV__ ? version : `${Constants.nativeAppVersion} (${Constants.nativeBuildVersion})`;
  return <Text style={[styles.text, style]}>{`v${versionString}`}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    marginVertical: 5,
  },
});
export default AppVersion;
