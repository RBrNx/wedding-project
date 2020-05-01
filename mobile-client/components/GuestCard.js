import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import SunIcon from './SVG/SunIcon';
import MoonIcon from './SVG/MoonIcon';
import { constantStyles } from '../styles/theming';

const GuestCard = ({ guest, index }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={[styles.statusLine, { backgroundColor: colors.secondary }]} />
      <View style={styles.textContainer}>
        <Text style={[styles.name, { color: colors.headerText }]}>{guest.name}</Text>
        <Text style={[styles.status, { color: colors.bodyText }]}>Awaiting RSVP</Text>
      </View>
      {index % 2 === 0 ? <MoonIcon style={styles.icon} /> : <SunIcon style={styles.icon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    ...constantStyles.cardShadow,
  },
  statusLine: {
    width: 5,
    borderRadius: 2.5,
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
