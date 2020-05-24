import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import FlatListAnimatedHeader from '../components/FlatListAnimatedHeader';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import EmptyMessage from '../components/EmptyMessage';
import InvitationsIllustration from '../components/SVG/Invitations';
import InvitationCard from '../components/InvitationCard';

const ALL_INVITATIONS_QUERY = loader('../graphql/allInvitationsQuery.graphql');

const InvitationRow = ({ invitation, index }) => {
  const [translateY] = useState(new Animated.Value(index < 10 ? 500 : 0));

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 350 + index * 100,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.cardContainer, { transform: [{ translateY }] }]}>
      <InvitationCard guests={invitation.guests} uniqueCode={invitation.uniqueCode} index={index} />
    </Animated.View>
  );
};

const InvitationsScreen = () => {
  const { loading, error, data, refetch } = useQuery(ALL_INVITATIONS_QUERY);

  return (
    <FlatListAnimatedHeader
      title='Invitations'
      onRefresh={async () => {
        await refetch();
      }}
      renderItem={({ item, index }) => <InvitationRow invitation={item} index={index} />}
      data={data?.getAllInvitations}
      renderImage={() => <InvitationsIllustration size='100%' />}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          {loading && <LoadingIndicator />}
          {error && <ErrorMessage message='We encountered an error when loading your Invitations, please try again.' />}
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

export default InvitationsScreen;
