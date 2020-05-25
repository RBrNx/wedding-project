import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { constantStyles } from '../styles/theming';
import StatusLine from './StatusLine';
import { GuestResponseEnum } from '../library/enums';
import TouchableNative from './TouchableNative';

const GuestCard = ({ guest }) => {
  const { firstName, lastName, attending } = guest;
  const { text: guestStatus } = GuestResponseEnum[attending];
  const { colors } = useTheme();

  return (
    <TouchableNative style={[styles.card, { backgroundColor: colors.card }]}>
      <StatusLine status={attending} />
      <View style={styles.textContainer}>
        <Text style={[styles.name, { color: colors.headerText }]}>
          {firstName} {lastName}
        </Text>
        <Text style={[styles.status, { color: colors.bodyText }]}>{guestStatus}</Text>
      </View>
      <Feather name='chevron-right' color={colors.componentBackground} size={30} />
    </TouchableNative>
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
