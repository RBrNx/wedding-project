import React from 'react';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
import { Colours } from 'library/styles';
import { version } from '../../../package.json';

const AppVersion = ({ style }) => {
  const versionString = __DEV__ ? version : `${Constants.nativeAppVersion} (${Constants.nativeBuildVersion})`;
  return <VersionText style={style}>{`v${versionString}`}</VersionText>;
};

const VersionText = styled.Text`
  color: ${Colours.neutral.grey3};
  margin-vertical: 5px;
`;

export default AppVersion;
