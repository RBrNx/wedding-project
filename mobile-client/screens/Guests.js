import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import Animated from 'react-native-reanimated';
import GuestCard from '../components/GuestCard';
import ScrollViewAnimatedHeader from '../components/ScrollViewAnimatedHeader';
import GuestImage from '../assets/undraw_sign_in_e6hj.png';

const ALL_GUESTS_QUERY = loader('../graphql/allGuestsQuery.graphql');

const GuestsScreen = () => {
  const { loading, error, data } = useQuery(ALL_GUESTS_QUERY);

  return (
    <ScrollViewAnimatedHeader title='Guests' imageSource={GuestImage}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error</Text>}
      {!loading && !error && (
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: '4%', backgroundColor: '#fff', paddingTop: 20 }}>
          {data.getAllGuests.map(guest => {
            return <GuestCard key={guest._id} guest={guest} />;
          })}
        </View>
      )}
    </ScrollViewAnimatedHeader>
  );
};

export default GuestsScreen;
