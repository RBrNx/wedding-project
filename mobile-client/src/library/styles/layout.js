import { css } from 'styled-components/native';

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

const round = size => {
  return css`
    height: ${size}px;
    width: ${size}px;
    border-radius: ${size / 2}px;
  `;
};

export { flexCenter, absoluteFill, round };
