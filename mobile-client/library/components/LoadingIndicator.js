import React from 'react';
import LoadingAnimation from '../../assets/animations/loading.json';
import LottieAnimation from './LottieAnimation';

const LoadingIndicator = ({ size, style }) => (
  <LottieAnimation style={style} source={LoadingAnimation} size={size} autoPlay loop speed={0.75} />
);

export default LoadingIndicator;
