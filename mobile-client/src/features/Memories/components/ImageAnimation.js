import React, { useEffect, useRef } from 'react';
import LottieAnimation from 'library/components/LottieAnimation';
import imageAnimation from 'assets/animations/image.json';

const ImageAnimation = ({ size, style }) => {
  const animation = useRef(null);

  const playAnimation = () => {
    if (animation.current) animation.current.play(0, 80);
  };

  const onAnimationFinish = () => setTimeout(playAnimation, 2000);

  useEffect(() => {
    playAnimation();
  }, []);

  return (
    <LottieAnimation
      ref={animation}
      source={imageAnimation}
      size={size}
      resizeMode='cover'
      style={style}
      onAnimationFinish={onAnimationFinish}
    />
  );
};

export default ImageAnimation;
