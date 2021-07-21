import { Colours, Layout, Outlines } from 'library/styles';
import React from 'react';
import ReactQRCode from 'react-qr-code';
import styled from 'styled-components';

const QRCode = ({ value, size }) => {
  return (
    <Container>
      <ReactQRCode
        value={value}
        level='M'
        size={size}
        bgColor={Colours.neutral.offWhite}
        fgColor={Colours.neutral.offBlack}
      />
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
  background-color: ${Colours.neutral.offWhite};
  ${Outlines.borderRadius};
  ${Layout.flexCenter}
  ${Outlines.boxShadow};
`;

export default QRCode;
