import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Dimensions } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components/native';
import LoadingIndicator from 'library/components/LoadingIndicator';
import ErrorMessage from 'library/components/ErrorMessage';
import EmptyMessage from 'library/components/EmptyMessage';
import { Colours, Layout, Theme } from 'library/styles';
import ALL_GUESTS_QUERY from 'library/graphql/queries/getAllGuests.graphql';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import StandardActionButton from 'library/components/StandardActionButton';
import { Feather } from '@expo/vector-icons';
import StandardSearchSortBar from 'library/components/StandardSearchSortBar';
import parseError from 'library/utils/parseError';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useAvoidKeyboard, useDebounceValue } from 'library/hooks';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import PartyIllustration from './components/PartyIllustration';
import GuestCard from './components/GuestCard';
import AddGuestSheet from './components/AddGuestSheet';

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

const GuestsScreen = () => {
  const bottomSheetRef = useRef(null);
  const scrollY = useSharedValue(0);
  const [showAddGuestSheet, setShowAddGuestSheet] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
  const { loading, error, data } = useQuery(ALL_GUESTS_QUERY, {
    variables: { input: { searchTerm: debouncedSearchTerm } },
    fetchPolicy: 'network-only',
    onCompleted: () => {
      if (isLoading) setIsLoading(false);
    },
  });
  useAvoidKeyboard({
    handleShow: () => bottomSheetRef.current?.expand(),
    handleHide: () => bottomSheetRef.current?.snapTo(0),
  });

  if (error) {
    const { message } = parseError(error);
    console.log(message);
  }

  const animatedImageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [height * 0.55, height * 0.175], [1, 0], Extrapolate.CLAMP);
    const scale = interpolate(scrollY.value, [height * 0.55, height * 0.175], [1, 0.2], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const renderFlatlist = ({ item, index }) => <GuestRow guest={item} index={index} />;

  const snapPoints = useMemo(() => ['45%', '82.5%'], []);

  return (
    <Container>
      <StyledDashboardHeader title='Guests' />
      <IllustrationContainer style={animatedImageStyle}>
        <PartyIllustration size='100%' />
      </IllustrationContainer>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundComponent={BottomSheetBackground}
        animatedPosition={scrollY}
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
              {!error && !loading && <EmptyMessage size={125} />}
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

const IllustrationContainer = styled(Animated.View)`
  padding-horizontal: 5%;
  height: 40%;
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

export default GuestsScreen;
