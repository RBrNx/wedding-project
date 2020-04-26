import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SunIcon from './SVG/SunIcon';
import MoonIcon from './SVG/MoonIcon';

const GuestCard = ({ guest, index }) => (
  <View style={styles.card}>
    <View style={styles.statusLine} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{guest.name}</Text>
      <Text style={styles.status}>Awaiting RSVP</Text>
    </View>
    {index % 2 === 0 ? <MoonIcon style={styles.icon} /> : <SunIcon style={styles.icon} />}
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
    elevation: 1.25,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLine: {
    width: 5,
    borderRadius: 2.5,
    backgroundColor: '#2991cc',
    height: '100%',
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
  icon: {
    opacity: 0.8,
  },
});

export default GuestCard;
