import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import GuestCard from '../components/GuestCard';
import ScrollViewAnimatedHeader from '../components/ScrollViewAnimatedHeader';
import GuestImage from '../assets/party.png';

const ALL_GUESTS_QUERY = loader('../graphql/allGuestsQuery.graphql');

const GuestsScreen = () => {
  const { loading, error, data } = useQuery(ALL_GUESTS_QUERY);

  return (
    <ScrollViewAnimatedHeader title='Guests' imageSource={GuestImage}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error</Text>}
      {!loading && !error && (
        <View style={styles.cardContainer}>
          {data.getAllGuests.map((guest, index) => {
            return <GuestCard key={guest._id} guest={guest} index={index} />;
          })}
        </View>
      )}
    </ScrollViewAnimatedHeader>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    paddingHorizontal: '4%',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});

export default GuestsScreen;
