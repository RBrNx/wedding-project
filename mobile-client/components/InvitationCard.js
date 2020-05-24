import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import SunIcon from './SVG/SunIcon';
import MoonIcon from './SVG/MoonIcon';
import { constantStyles } from '../styles/theming';
import StatusLine from './StatusLine';
import TouchableNative from './TouchableNative';

const typeIcons = Object.freeze({ DAYTIME: SunIcon, EVENING: MoonIcon });

const InvitationCard = ({ guests, uniqueCode, type }) => {
  const { colors } = useTheme();
  const TypeIcon = typeIcons[type];

  return (
    <TouchableNative style={[styles.card, { backgroundColor: colors.card }]} onPress={() => console.log(type)}>
      <View style={[styles.invitationRow, { borderBottomColor: colors.componentBackground }]}>
        <Text style={[styles.uniqueCode, { color: colors.headerText }]}>{uniqueCode.toUpperCase()}</Text>
        <TypeIcon style={styles.icon} />
      </View>
      <View style={styles.guestContainer}>
        {guests.map((guest, guestIndex) => {
          const { firstName, lastName, attending } = guest;
          const isFirst = guestIndex === 0;
          const isLast = guestIndex === guests.length - 1;

          return (
            <View key={guest._id} style={styles.guestRow}>
              <StatusLine status={attending} isFirst={isFirst} isLast={isLast} />
              <Text style={[styles.name, { color: colors.headerText }]}>
                {firstName} {lastName}
              </Text>
            </View>
          );
        })}
      </View>
    </TouchableNative>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    ...constantStyles.cardShadow,
  },
  invitationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  guestContainer: {
    paddingTop: 12,
  },
  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    marginVertical: 2,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 15,
    paddingLeft: 20,
  },
  uniqueCode: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
    flex: 1,
    paddingLeft: 5,
  },
  status: {
    marginVertical: 5,
  },
  icon: {
    opacity: 0.8,
  },
});

export default InvitationCard;
