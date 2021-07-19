import React, { useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components/native';
import HeaderFlatlist from 'library/components/HeaderFlatlist';
import LoadingIndicator from 'library/components/LoadingIndicator';
import ErrorMessage from 'library/components/ErrorMessage';
import EmptyMessage from 'library/components/EmptyMessage';
import { Colours, Layout } from 'library/styles';
import ALL_GUESTS_QUERY from 'library/graphql/queries/getAllGuests.graphql';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import StandardActionButton from 'library/components/StandardActionButton';
import { Feather } from '@expo/vector-icons';
import PartyIllustration from './components/PartyIllustration';
import GuestCard from './components/GuestCard';
import AddGuestSheet from './components/AddGuestSheet';

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
    <CardContainer style={{ transform: [{ translateY }] }}>
      <GuestCard guest={guest} index={index} />
    </CardContainer>
  );
};

const GuestsScreen = () => {
  const [showAddGuestSheet, setShowAddGuestSheet] = useState(false);
  const { loading, error, data, refetch } = useQuery(ALL_GUESTS_QUERY);

  return (
    <Container>
      <StyledDashboardHeader title='Guests' />
      <HeaderFlatlist
        title='Guests'
        onRefresh={async () => refetch()}
        renderItem={({ item, index }) => <GuestRow guest={item} index={index} />}
        data={data?.getAllGuests}
        renderImage={() => <PartyIllustration size='100%' />}
        ListEmptyComponent={() => (
          <ListEmptyContainer>
            {loading && <LoadingIndicator size={50} />}
            {error && (
              <ErrorMessage size={125} message='We encountered an error when loading your Guests, please try again.' />
            )}
            {!error && !loading && <EmptyMessage size={125} />}
          </ListEmptyContainer>
        )}
      />
      <StandardActionButton
        label='Add Guest'
        icon={<StyledIcon name='user-plus' size={20} />}
        onPress={() => setShowAddGuestSheet(true)}
        removeElevation={showAddGuestSheet}
      />
      <AddGuestSheet active={showAddGuestSheet} onDismiss={() => setShowAddGuestSheet(false)} />
    </Container>
  );
};

const Container = styled.View`
  padding-top: ${Layout.statusBarHeight}px;
  flex: 1;
`;

const StyledDashboardHeader = styled(DashboardHeader)`
  padding-horizontal: 5%;
`;

const CardContainer = styled(Animated.View)`
  padding-horizontal: 5%;
`;

const ListEmptyContainer = styled.View`
  flex: 1;
  padding-horizontal: 5%;
  ${Layout.flexCenter};
`;

const StyledIcon = styled(Feather)`
  color: ${Colours.neutral.white};
`;

export default GuestsScreen;
