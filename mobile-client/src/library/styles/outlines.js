import { Platform } from 'react-native';
import { css } from 'styled-components/native';

const boxShadow = css`
  box-shadow: 0px 2px 2.62px rgba(0, 0, 0, 0.23);
  elevation: 4;
`;

const borderRadius = css`
  border-radius: 10px;
  ${Platform.OS === 'ios' &&
    css`
      overflow: hidden;
    `};
`;

const inputBorder = css`
  border-width: 1.5px;
`;

export { boxShadow, borderRadius, inputBorder };
