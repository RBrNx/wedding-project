import React from 'react';
import { View, StyleSheet } from 'react-native';

const statusColors = Object.freeze({ AWAITING_RSVP: '#2991cc', ATTENDING: '#04b84a', NOT_ATTENDING: '#966fd6' });

const StatusLine = ({ status, isFirst, isLast }) => {
  return (
    <View
      style={[
        styles.statusLine,
        {
          backgroundColor: statusColors[status],
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
