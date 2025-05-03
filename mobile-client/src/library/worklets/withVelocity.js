/* eslint-disable no-param-reassign */

import { defineAnimation } from 'react-native-reanimated';

const withVelocity = (userConfig, callback) => {
  'worklet';

  return defineAnimation(0, () => {
    'worklet';

    const config = {
      velocity: 0,
      elasticity: 1,
      xBounds: { lower: null, upper: null },
      ...userConfig,
    };

    const onFrame = (animation, now) => {
      const { lastTimestamp, velocity } = animation;

      const deltaTime = (now - lastTimestamp) / 1000;

      animation.lastTimestamp = now;
      animation.current += velocity * deltaTime;

      if (config.xBounds.lower !== null && animation.current < config.xBounds.lower) {
        animation.current = config.xBounds.lower;
        animation.velocity *= -config.elasticity;
      }
      if (config.xBounds.upper !== null && animation.current > config.xBounds.upper) {
        animation.current = config.xBounds.upper;
        animation.velocity *= -config.elasticity;
      }

      return false;
    };

    const onStart = (animation, value, now) => {
      animation.current = value;
      animation.lastTimestamp = now;
      animation.velocity = config.velocity;
    };

    return {
      onFrame,
      onStart,
      callback,
    };
  });
};

export default withVelocity;
