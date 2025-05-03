import React from 'react';
import LottieAnimation from 'library/components/LottieAnimation';
import notificationAnimation from 'assets/animations/notifications.json';

const NotificationAnimation = ({ size, style }) => (
  <LottieAnimation source={notificationAnimation} size={size} autoPlay loop resizeMode='cover' style={style} />
);

export default NotificationAnimation;
