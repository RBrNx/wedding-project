import { useQuery } from '@apollo/react-hooks';
import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import EmptyMessage from 'library/components/EmptyMessage';
import ErrorMessage from 'library/components/ErrorMessage';
import LoadingIndicator from 'library/components/LoadingIndicator';
import StandardActionButton from 'library/components/StandardActionButton';
import { useAvoidKeyboard } from 'library/hooks';
import { Colours, Layout, Theme } from 'library/styles';
import React, { useEffect, useMemo, useRef } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components';
import GET_RSVP_QUESTIONS from 'library/graphql/queries/getRSVPQuestions.graphql';
import QuestionCard from './QuestionCard';

const QuestionRow = ({ question, index }) => {
  const translateY = useSharedValue(index < 10 ? 500 : 0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 350 + index * 100, easing: Easing.out(Easing.exp) });
  }, [index, translateY]);

  const animatedRowStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  return (
    <CardContainer style={animatedRowStyle}>
      <QuestionCard question={question} index={index} />
    </CardContainer>
  );
};

const QuestionFlatlist = ({ showAddGuestSheet, setShowAddGuestSheet, scrollPosition }) => {
  const bottomSheetRef = useRef(null);
  const { loading, error, data } = useQuery(GET_RSVP_QUESTIONS);
  useAvoidKeyboard({
    handleShow: () => bottomSheetRef.current?.expand(),
    handleHide: () => bottomSheetRef.current?.snapTo(0),
  });

  const renderFlatlist = ({ item, index }) => <QuestionRow question={item} index={index} />;

  const snapPoints = useMemo(() => ['45%', '82.5%'], []);

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
          data={data?.getRSVPQuestions}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <ListEmptyContainer>
              {loading && <LoadingIndicator size={50} />}
              {error && (
                <ErrorMessage
                  size={125}
                  message='We encountered an error when loading your RSVP Questions, please try again.'
                />
              )}
              {!error && !loading && <EmptyMessage size={125} />}
            </ListEmptyContainer>
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
  flex: 1;
  padding-horizontal: 5%;
  ${Layout.flexCenter};
`;

const StyledIcon = styled(Feather)`
  color: ${Colours.neutral.white};
`;

const BottomSheetBackground = styled.View`
  background-color: ${Theme.background};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

export default QuestionFlatlist;
