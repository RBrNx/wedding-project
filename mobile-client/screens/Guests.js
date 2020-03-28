import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import GuestCard from '../components/GuestCard';
import ScrollViewAnimatedHeader from '../components/ScrollViewAnimatedHeader';
import GuestImage from '../assets/party.png';
import LoadingIndicator from '../components/LoadingIndicator';

const ALL_GUESTS_QUERY = loader('../graphql/allGuestsQuery.graphql');

const GuestsScreen = () => {
  const { loading, error, data, refetch } = useQuery(ALL_GUESTS_QUERY);

  return (
    <ScrollViewAnimatedHeader title='Guests' imageSource={GuestImage} onRefresh={async () => await refetch()}>
      <View style={styles.cardContainer}>
        {true && <LoadingIndicator />}
        {error && <Text>Error</Text>}
        {!true &&
          !error &&
          data.getAllGuests.map((guest, index) => {
            return <GuestCard key={guest._id} guest={guest} index={index} />;
          })}
      </View>
    </ScrollViewAnimatedHeader>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '4%',
    backgroundColor: '#fff',
    paddingTop: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default GuestsScreen;
