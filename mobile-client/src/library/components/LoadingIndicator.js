import React from 'react';
import LottieAnimation from 'library/components/LottieAnimation';
import LoadingAnimation from 'assets/animations/loading.json';

const LoadingIndicator = ({ size, style }) => (
  <LottieAnimation style={style} source={LoadingAnimation} size={size} autoPlay loop speed={0.75} />
);

export default LoadingIndicator;
