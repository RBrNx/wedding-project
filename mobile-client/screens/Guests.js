import React from 'react';
import { Text, View } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import GuestCard from '../components/GuestCard';

const ALL_GUESTS_QUERY = loader('../graphql/allGuestsQuery.graphql');

const GuestsScreen = () => {
  const { loading, error, data } = useQuery(ALL_GUESTS_QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  const guests = data.getAllGuests;

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: '4%', backgroundColor: '#fff' }}>
      {guests.map(guest => {
        return <GuestCard key={guest._id} guest={guest} />;
      })}
    </View>
  );
};

export default GuestsScreen;
