import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const GuestCard = ({ guest }) => (
  <View style={styles.card}>
    <View style={styles.statusLine} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{guest.name}</Text>
      <Text style={styles.status}>Awaiting RSVP</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  statusLine: {
    width: 5,
    borderRadius: 2.5,
    backgroundColor: '#2991cc',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
  },
  status: {
    marginVertical: 5,
  },
});

export default GuestCard;
