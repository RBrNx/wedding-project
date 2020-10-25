import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import GuestCard from '../components/GuestCard';
import FlatListAnimatedHeader from '../library/components/FlatListAnimatedHeader';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import EmptyMessage from '../components/EmptyMessage';
import PartyIllustration from '../components/SVG/Party';

const ALL_GUESTS_QUERY = loader('../graphql/allGuestsQuery.graphql');

const GuestRow = ({ guest, index }) => {
  const [translateY] = useState(new Animated.Value(index < 10 ? 500 : 0));

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 350 + index * 100,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [index, translateY]);

  return (
    <Animated.View style={[styles.cardContainer, { transform: [{ translateY }] }]}>
      <GuestCard guest={guest} index={index} />
    </Animated.View>
  );
};

const GuestsScreen = () => {
  const { loading, error, data, refetch } = useQuery(ALL_GUESTS_QUERY);

  return (
    <FlatListAnimatedHeader
      title='Guests'
      onRefresh={async () => {
        await refetch();
      }}
      renderItem={({ item, index }) => <GuestRow guest={item} index={index} />}
      data={data?.getAllGuests}
      renderImage={() => <PartyIllustration size='100%' />}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          {loading && <LoadingIndicator />}
          {error && <ErrorMessage message='We encountered an error when loading your Guests, please try again.' />}
          {!error && !loading && <EmptyMessage />}
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
    paddingHorizontal: '4%',
  },
});

export default GuestsScreen;
