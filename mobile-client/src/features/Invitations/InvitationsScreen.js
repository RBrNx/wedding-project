import React, { useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components/native';
import HeaderFlatlist from 'library/components/HeaderFlatlist';
import LoadingIndicator from 'library/components/LoadingIndicator';
import ErrorMessage from 'library/components/ErrorMessage';
import EmptyMessage from 'library/components/EmptyMessage';
import { Layout } from 'library/styles';
import ALL_INVITATIONS_QUERY from 'library/graphql/queries/getAllInvitations.graphql';
import parseError from 'library/utils/parseError';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import InvitationsIllustration from './components/InvitationsIllustration';
import InvitationCard from './components/InvitationCard';

const InvitationRow = ({ invitation, index }) => {
  const [translateY] = useState(new Animated.Value(index < 10 ? 500 : 0));
  const { guests, type } = invitation;

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
      <InvitationCard guests={guests} type={type} index={index} />
    </CardContainer>
  );
};

const InvitationsScreen = () => {
  const { loading, error, data, refetch } = useQuery(ALL_INVITATIONS_QUERY);

  if (error) {
    const { message } = parseError(error);
    console.log({ message });
  }

  return (
    <Container>
      <StyledDashboardHeader title='Invitations' />
      <HeaderFlatlist
        title='Invitations'
        onRefresh={async () => {
          await refetch();
        }}
        renderItem={({ item, index }) => <InvitationRow invitation={item} index={index} />}
        data={data?.getAllInvitationGroups}
        renderImage={() => <InvitationsIllustration size='100%' />}
        ListEmptyComponent={() => (
          <ListEmptyContainer>
            {loading && <LoadingIndicator size={50} />}
            {error && (
              <ErrorMessage
                size={125}
                message='We encountered an error when loading your Invitations, please try again.'
              />
            )}
            {!error && !loading && <EmptyMessage size={125} />}
          </ListEmptyContainer>
        )}
      />
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

export default InvitationsScreen;
