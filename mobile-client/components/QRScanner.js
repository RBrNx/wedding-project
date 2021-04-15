import React from 'react';
import qrScanAnimation from '../assets/animations/qrScanner.json';
import LottieAnimation from '../library/components/LottieAnimation';

const QRScanner = ({ size, style }) => (
  <LottieAnimation source={qrScanAnimation} size={size} autoPlay loop resizeMode='cover' style={style} />
);

export default QRScanner;
