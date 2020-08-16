import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import StatusLine from './StatusLine';
import { InvitationTypeEnum } from '../library/enums';
import StandardPressable from './StandardPressable';

const InvitationCard = ({ guests, uniqueCode, type }) => {
  const { colors } = useTheme();
  const { icon: TypeIcon } = InvitationTypeEnum[type];

  return (
    <StandardPressable
      raised
      style={[styles.card, { backgroundColor: colors.card }]}
      outerStyle={styles.outerCard}
      onPress={() => {}}
    >
      <View style={[styles.headerRow, { borderBottomColor: colors.componentBackground }]}>
        <TypeIcon style={styles.icon} size={40} />
        <Text style={[styles.uniqueCode, { color: colors.headerText }]}>{uniqueCode.toUpperCase()}</Text>
      </View>
      <View style={styles.bodyRow}>
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
        <Feather name='chevron-right' color={colors.componentBackground} size={30} />
      </View>
    </StandardPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
  },
  outerCard: {
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestContainer: {
    paddingTop: 12,
    flex: 1,
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
