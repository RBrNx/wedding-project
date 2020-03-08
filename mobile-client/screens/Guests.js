import React from 'react';
import { Text, View } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';

const ALL_GUESTS_QUERY = loader('../graphql/allGuestsQuery.graphql');

const GuestsScreen = () => {
  const { loading, error, data } = useQuery(ALL_GUESTS_QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  const guests = data.getAllGuests;

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {guests.map(guest => {
        return <Text key={guest._id}>{guest.name}</Text>;
      })}
    </View>
  );
};

export default GuestsScreen;
