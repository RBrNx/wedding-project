import React from 'react';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
import { Colours } from 'library/styles';
import { version } from '../../../package.json';

const { ENV } = Constants.manifest.extra;
const isProduction = ENV === 'production';

const AppVersion = ({ style }) => {
  const versionString = isProduction ? `${Constants.nativeAppVersion} (${Constants.nativeBuildVersion})` : version;
  return <VersionText style={style}>{`v${versionString}`}</VersionText>;
};

const VersionText = styled.Text`
  color: ${Colours.neutral.grey2};
  margin-vertical: 5px;
`;

export default AppVersion;
