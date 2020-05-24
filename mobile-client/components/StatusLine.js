import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GuestResponseEnum } from '../library/enums';

const StatusLine = ({ status, isFirst = true, isLast = true }) => {
  const { color } = GuestResponseEnum[status];

  return (
    <View
      style={[
        styles.statusLine,
        {
          backgroundColor: color,
          borderTopRightRadius: isFirst ? 2.5 : 0,
          borderTopLeftRadius: isFirst ? 2.5 : 0,
          borderBottomLeftRadius: isLast ? 2.5 : 0,
          borderBottomRightRadius: isLast ? 2.5 : 0,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  statusLine: {
    width: 5,
    height: '100%',
  },
});

export default StatusLine;
