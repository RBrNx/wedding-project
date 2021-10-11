import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import EmptyMessage from 'library/components/EmptyMessage';
import ErrorMessage from 'library/components/ErrorMessage';
import LoadingIndicator from 'library/components/LoadingIndicator';
import { Colours, Layout, Theme } from 'library/styles';
import React, { useEffect, useRef, useState } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components';
import GET_ALL_INVITATIONS from 'library/graphql/queries/getAllInvitations.graphql';
import { Dimensions } from 'react-native';
import StandardActionButton from 'library/components/StandardActionButton';
import { Feather } from '@expo/vector-icons';
import DELETE_INVITATION from 'library/graphql/mutations/deleteInvitationGroup.graphql';
import useInvitationMutation from 'library/hooks/useInvitationMutation';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';
import { useAlert } from 'context';
import { useDebounceValue, useLazyQuery, useSnapPoints } from 'library/hooks';
import DeletePrompt from './DeletePrompt';
import CreateInvitationSheet from './CreateInvitationSheet';
import InvitationCard from './InvitationCard';
import InvitationFlatlistHeader from './InvitationFlatlistHeader';

const { height } = Dimensions.get('window');

const InvitationRow = ({ invitation, index, onDeletePress, responseFilter }) => {
  const translateY = useSharedValue(index < 10 ? 500 : 0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 350 + index * 100, easing: Easing.out(Easing.exp) });
  }, [index, translateY]);

  const animatedRowStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  return (
    <CardContainer style={animatedRowStyle}>
      <InvitationCard
        invitation={invitation}
        index={index}
        onDeletePress={onDeletePress}
        responseFilter={responseFilter}
      />
    </CardContainer>
  );
};

const InvitationFlatlist = ({ scrollPosition }) => {
  const bottomSheetRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [inviteToDelete, setInviteToDelete] = useState(null);
  const [showCreateInvitationSheet, setShowCreateInvitationSheet] = useState(false);
  const [responseFilter, setResponseFilter] = useState([]);
  const [deleteInvitation, { loading: deletionInProgress }] = useInvitationMutation(DELETE_INVITATION);
  const debouncedSearchTerm = useDebounceValue(searchTerm, 1000);
  const [getAllInvitations, { loading, data, error }] = useLazyQuery(GET_ALL_INVITATIONS);
  const snapPoints = useSnapPoints();
  const { showAlert } = useAlert();

  useEffect(
    () => {
      const performSearch = async () => {
        await getAllInvitations({ filter: { searchTerm } });
      };

      if (debouncedSearchTerm || debouncedSearchTerm === '') {
        performSearch();
      }
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  );

  const onSheetDismiss = () => {
    setShowCreateInvitationSheet(false);
  };

  const onPromptDismiss = () => {
    setShowDeletePrompt(false);
    setInviteToDelete(null);
  };

  const deleteInvitationGroup = async () => {
    try {
      const { data: deletionData } = await deleteInvitation({
        variables: { id: inviteToDelete._id },
      });

      const { success } = deletionData?.deleteInvitationGroup;

      if (success) onPromptDismiss();
    } catch (deletionError) {
      const { message } = parseError(deletionError);
      console.log(message);
      showAlert({ message, type: AlertType.WARNING });
    }
  };

  const renderFlatlist = ({ item, index }) => (
    <InvitationRow
      invitation={item}
      index={index}
      onDeletePress={() => {
        setShowDeletePrompt(true);
        setInviteToDelete(item);
      }}
      responseFilter={responseFilter}
    />
  );

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundComponent={BottomSheetBackground}
        animatedPosition={scrollPosition}
        enableOverDrag={false}
      >
        <BottomSheetFlatList
          renderItem={renderFlatlist}
          data={data?.getAllInvitationGroups}
          keyExtractor={item => item._id}
          ListHeaderComponent={
            <InvitationFlatlistHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              invitations={data?.getAllInvitationGroups}
              responseFilter={responseFilter}
              setResponseFilter={setResponseFilter}
            />
          }
          ListEmptyComponent={
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
          }
        />
      </BottomSheet>
      <CreateInvitationSheet active={showCreateInvitationSheet} onDismiss={onSheetDismiss} />
      <DeletePrompt
        visible={showDeletePrompt}
        onDismiss={onPromptDismiss}
        invitation={inviteToDelete}
        onDelete={deleteInvitationGroup}
        loading={deletionInProgress}
      />
      <StandardActionButton
        label='Create Invitation'
        icon={<StyledIcon name='plus' size={20} />}
        onPress={() => setShowCreateInvitationSheet(true)}
        removeElevation={showCreateInvitationSheet}
      />
    </>
  );
};

const CardContainer = styled(Animated.View)`
  padding-horizontal: 5%;
`;

const ListEmptyContainer = styled.View`
  height: ${height * 0.4}px;
  padding-horizontal: 5%;
  ${Layout.flexCenter};
`;

const BottomSheetBackground = styled.View`
  background-color: ${Theme.background};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const StyledIcon = styled(Feather)`
  color: ${Colours.neutral.white};
`;

export default InvitationFlatlist;
