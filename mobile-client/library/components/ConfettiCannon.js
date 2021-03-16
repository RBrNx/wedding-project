import React, { useMemo } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import ConfettiImage from '../../assets/confetti.png';

const NUM_CONFETTI = 100;
const COLORS = ['#00e4b2', '#09aec5', '#107ed5'];
const CONFETTI_SIZE = 16;

const createConfetti = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

  return [...new Array(NUM_CONFETTI)].map((_, i) => {
    return {
      key: i,
      x: screenWidth * Math.random(),
      y: screenHeight * Math.random(),
      angle: 360 * Math.random(),
      color: COLORS[i % COLORS.length],
    };
  });
};

const ConfettiCannon = () => {
  const confetti = useMemo(createConfetti, []);

  return (
    <View pointerEvents='none' style={StyleSheet.absoluteFill}>
      {confetti.map(({ key, x, y, angle, color }) => {
        return (
          <Animated.View
            key={key}
            style={[
              styles.confettiContainer,
              {
                transform: [{ translateX: x }, { translateY: y }, { rotate: `${angle}deg` }],
              },
            ]}
          >
            <Image source={ConfettiImage} tintColor={color} style={styles.confetti} />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  confetti: {
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
  },
});

export default ConfettiCannon;
