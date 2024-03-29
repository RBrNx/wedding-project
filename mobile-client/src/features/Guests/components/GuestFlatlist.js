import { useQuery } from '@apollo/react-hooks';
import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import EmptyMessage from 'library/components/EmptyMessage';
import ErrorMessage from 'library/components/ErrorMessage';
import LoadingIndicator from 'library/components/LoadingIndicator';
import StandardActionButton from 'library/components/StandardActionButton';
import StandardSearchSortBar from 'library/components/StandardSearchSortBar';
import { useAvoidKeyboard, useDebounceValue, useSnapPoints } from 'library/hooks';
import { Colours, Layout, Theme } from 'library/styles';
import React, { useEffect, useRef, useState } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components';
import ALL_GUESTS_QUERY from 'library/graphql/queries/getAllGuests.graphql';
import { Dimensions } from 'react-native';
import GuestCard from './GuestCard';

const { height } = Dimensions.get('window');

const GuestRow = ({ guest, index }) => {
  const translateY = useSharedValue(index < 10 ? 500 : 0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 350 + index * 100, easing: Easing.out(Easing.exp) });
  }, [index, translateY]);

  const animatedRowStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  return (
    <CardContainer style={animatedRowStyle}>
      <GuestCard guest={guest} index={index} />
    </CardContainer>
  );
};

const GuestFlatlist = ({ showAddGuestSheet, setShowAddGuestSheet, scrollPosition }) => {
  const bottomSheetRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
  const snapPoints = useSnapPoints();
  const { loading, error, data } = useQuery(ALL_GUESTS_QUERY, {
    variables: { input: { searchTerm: debouncedSearchTerm } },
    fetchPolicy: 'network-only',
    onCompleted: () => {
      if (isLoading) setIsLoading(false);
    },
    onError: () => {
      if (isLoading) setIsLoading(false);
    },
  });
  useAvoidKeyboard({
    handleShow: () => bottomSheetRef.current?.expand(),
    handleHide: () => bottomSheetRef.current?.snapTo(0),
  });

  const renderFlatlist = ({ item, index }) => <GuestRow guest={item} index={index} />;

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
          data={data?.getAllGuests}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <ListEmptyContainer>
              {isLoading && <LoadingIndicator size={50} />}
              {error && (
                <ErrorMessage
                  size={125}
                  message='We encountered an error when loading your Guests, please try again.'
                />
              )}
              {!error && !isLoading && <EmptyMessage size={125} />}
            </ListEmptyContainer>
          }
          ListHeaderComponent={
            <SearchContainer>
              <StyledSearchSortBar value={searchTerm} onChangeText={setSearchTerm} loading={loading && !isLoading} />
            </SearchContainer>
          }
        />
      </BottomSheet>
      <StandardActionButton
        label='Add Guest'
        icon={<StyledIcon name='user-plus' size={20} />}
        onPress={() => setShowAddGuestSheet(true)}
        removeElevation={showAddGuestSheet}
      />
    </>
  );
};

const CardContainer = styled(Animated.View)`
  padding-horizontal: 5%;
`;

const ListEmptyContainer = styled.View`
  height: ${height * 0.3}px;
  padding-horizontal: 5%;
  ${Layout.flexCenter};
`;

const StyledIcon = styled(Feather)`
  color: ${Colours.neutral.white};
`;

const SearchContainer = styled.View`
  padding-horizontal: 5%;
  background-color: ${Theme.background};
  z-index: 99;
`;

const StyledSearchSortBar = styled(StandardSearchSortBar)`
  margin-top: 5px;
  margin-bottom: 15px;
`;

const BottomSheetBackground = styled.View`
  background-color: ${Theme.background};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

export default GuestFlatlist;
