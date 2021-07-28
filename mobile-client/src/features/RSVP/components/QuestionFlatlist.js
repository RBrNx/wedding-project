import { useQuery } from '@apollo/react-hooks';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import EmptyMessage from 'library/components/EmptyMessage';
import ErrorMessage from 'library/components/ErrorMessage';
import LoadingIndicator from 'library/components/LoadingIndicator';
import { useAvoidKeyboard } from 'library/hooks';
import { Colours, Layout, Theme } from 'library/styles';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components';
import GET_RSVP_QUESTIONS from 'library/graphql/queries/getRSVPQuestions.graphql';
import { Dimensions } from 'react-native';
import StandardActionButton from 'library/components/StandardActionButton';
import { Feather } from '@expo/vector-icons';
import QuestionCard from './QuestionCard';
import EditQuestionSheet from './EditQuestionSheet';

const { height } = Dimensions.get('window');

const QuestionRow = ({ question, index, onPress, onAddFollowUp }) => {
  const translateY = useSharedValue(index < 10 ? 500 : 0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 350 + index * 100, easing: Easing.out(Easing.exp) });
  }, [index, translateY]);

  const animatedRowStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  return (
    <CardContainer style={animatedRowStyle}>
      <QuestionCard question={question} index={index} onPress={onPress} onAddFollowUp={onAddFollowUp} />
    </CardContainer>
  );
};

const QuestionFlatlist = ({ scrollPosition }) => {
  const bottomSheetRef = useRef(null);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  const [questionToFollow, setQuestionToFollow] = useState(null);
  const [parentQuestion, setParentQuestion] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showAddEditQuestionSheet, setShowAddEditQuestionSheet] = useState(false);
  const { loading, error, data } = useQuery(GET_RSVP_QUESTIONS);
  // useAvoidKeyboard({
  //   handleShow: () => bottomSheetRef.current?.expand(),
  //   handleHide: () => bottomSheetRef.current?.snapTo(0),
  // });

  const onQuestionPress = (question, parentQ) => {
    if (question.isFollowUp) {
      setQuestionToFollow(question);
      setParentQuestion(parentQ);
    } else {
      setQuestionToEdit(question);
    }

    setEditMode(true);
    setShowAddEditQuestionSheet(true);
  };

  const onAddFollowUp = question => {
    setQuestionToFollow(question);
    setShowAddEditQuestionSheet(true);
  };

  const resetState = () => {
    setQuestionToEdit(null);
    setQuestionToFollow(null);
    setEditMode(false);
  };

  const onSheetDismiss = () => {
    resetState();
    setShowAddEditQuestionSheet(false);
  };

  const renderFlatlist = ({ item, index }) => (
    <QuestionRow question={item} index={index} onPress={onQuestionPress} onAddFollowUp={onAddFollowUp} />
  );

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
      <EditQuestionSheet
        active={showAddEditQuestionSheet}
        onDismiss={onSheetDismiss}
        question={questionToEdit || questionToFollow}
        parentQuestion={parentQuestion}
        isFollowUpQuestion={!!questionToFollow}
        editMode={editMode}
      />
      <StandardActionButton
        label='Add Question'
        icon={<StyledIcon name='plus' size={20} />}
        onPress={() => setShowAddEditQuestionSheet(true)}
        removeElevation={showAddEditQuestionSheet}
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

export default QuestionFlatlist;
