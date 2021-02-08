import React from 'react';
import { View, StyleSheet } from 'react-native';

const StatusLine = ({ colour, isFirst = true, isLast = true }) => {
  return (
    <View
      style={[
        styles.statusLine,
        {
          backgroundColor: colour,
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
