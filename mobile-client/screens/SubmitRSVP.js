import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SubmitRSVPScreen = () => {
  return (
    <View style={styles.container}>
      <Text>RSVP Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
});

export default SubmitRSVPScreen;
