import React, { useMemo } from 'react';
import LottieAnimation from 'library/components/LottieAnimation';
import LoadingAnimation from 'assets/animations/loading.json';
import colouriseLottie from 'library/utils/colouriseLottie';
import { useCurrentTheme } from 'context';

const indicatorBackground = {
  light: '#1b1b1b',
  dark: '#a2a2a2',
};

const LoadingIndicator = ({ size, style, backgroundColour }) => {
  const { currentTheme } = useCurrentTheme();

  const colorizedSource = useMemo(
    () =>
      colouriseLottie(LoadingAnimation, {
        // Shape Layer 1.Shape 1.Stroke 1
        'layers.1.shapes.0.it.1.c.k': backgroundColour || indicatorBackground[currentTheme],
      }),
    [currentTheme],
  );

  return <LottieAnimation style={style} source={colorizedSource} size={size} autoPlay loop speed={0.75} />;
};

export default LoadingIndicator;
