import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

const ListHandle = ({ animatedHandleContainerStyle }) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      style={[styles.background, animatedHandleContainerStyle, { backgroundColor: colors.cardBackground }]}
    >
      <View style={styles.handle} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handle: {
    width: 30,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#aaa',
  },
});

export default ListHandle;
