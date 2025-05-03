import { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform } from 'react-native';

const flexCenter = css`
  justify-content: center;
  align-items: center;
`;

const absoluteFill = css`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`;

const round = (size = 5) => {
  return css`
    height: ${size}px;
    width: ${size}px;
    border-radius: ${size / 2}px;
  `;
};

const safeArea = css`
  padding-bottom: ${Platform.OS === 'ios' ? 7.5 : 5}%;
`;

const statusBarHeight = getStatusBarHeight();

export { flexCenter, absoluteFill, round, statusBarHeight, safeArea };
