import React from 'react';
import { View, StyleSheet } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import GuestCard from '../components/GuestCard';
import FlatListAnimatedHeader from '../components/FlatListAnimatedHeader';
import GuestImage from '../assets/party.png';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';

const ALL_GUESTS_QUERY = loader('../graphql/allGuestsQuery.graphql');

const GuestsScreen = () => {
  const { loading, error, data, refetch } = useQuery(ALL_GUESTS_QUERY);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.cardContainer}>
        <GuestCard key={item._id} guest={item} index={index} />
      </View>
    );
  };

  return (
    <FlatListAnimatedHeader
      title='Guests'
      imageSource={GuestImage}
      onRefresh={async () => {
        await refetch();
      }}
      renderItem={renderItem}
      data={data?.getAllGuests}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          {loading && <LoadingIndicator />}
          {error && <ErrorMessage message='We encountered an error when loading your Guests, please try again.' />}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: '4%',
  },
  emptyContainer: {
    flex: 1,
    marginTop: -50,
  },
});

export default GuestsScreen;
