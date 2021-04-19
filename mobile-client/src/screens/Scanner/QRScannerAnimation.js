import React from 'react';
import LottieAnimation from 'library/components/LottieAnimation';
import qrScanAnimation from '../../../assets/animations/qrScanner.json';

const QRScannerAnimation = ({ size, style }) => (
  <LottieAnimation source={qrScanAnimation} size={size} autoPlay loop resizeMode='cover' style={style} />
);

export default QRScannerAnimation;
