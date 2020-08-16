import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { constantStyles } from '../styles/theming';
import TouchableNative from './TouchableNative';

const StandardPressable = ({ children, style, onPress, raised, outerStyle }) => {
  const pressableStyles = [styles.outer];
  if (raised) pressableStyles.push({ ...constantStyles.cardShadow });

  return (
    <View style={[...pressableStyles, { ...outerStyle }]}>
      <TouchableNative style={style} onPress={onPress}>
        {children}
      </TouchableNative>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    ...Platform.select({
      android: {
        overflow: 'hidden',
      },
    }),
  },
});

export default StandardPressable;
