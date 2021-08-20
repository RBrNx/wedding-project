import { useQuery } from '@apollo/react-hooks';
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import EmptyMessage from 'library/components/EmptyMessage';
import ErrorMessage from 'library/components/ErrorMessage';
import LoadingIndicator from 'library/components/LoadingIndicator';
import { Colours, Layout, Theme } from 'library/styles';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useAvoidKeyboard, useSnapPoints } from 'library/hooks';
import Spacer from 'library/components/Spacer';
import EditVenueCard from './EditVenueCard';
import EditScheduleCard from './EditScheduleCard';
import EditMenuCard from './EditMenuCard';

const EditDetailsView = ({ scrollPosition }) => {
  const bottomSheetRef = useRef(null);
  const { keyboardHeight } = useAvoidKeyboard();

  const snapPoints = useSnapPoints();

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
        <StyledBottomSheetScrollView keyboardHeight={keyboardHeight}>
          <EditVenueCard />
          <Spacer size={20} />
          <EditScheduleCard />
          <Spacer size={20} />
          <EditMenuCard />
        </StyledBottomSheetScrollView>
      </BottomSheet>
      {/* <EditQuestionSheet
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
      /> */}
    </>
  );
};

// const CardContainer = styled(Animated.View)`
//   padding-horizontal: 5%;
// `;

// const ListEmptyContainer = styled.View`
//   height: ${height * 0.4}px;
//   padding-horizontal: 5%;
//   ${Layout.flexCenter};
// `;

const BottomSheetBackground = styled.View`
  background-color: ${Theme.background};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const StyledBottomSheetScrollView = styled(BottomSheetScrollView).attrs(props => ({
  contentContainerStyle: {
    paddingHorizontal: '5%',
    paddingBottom: props.keyboardHeight || 20,
  },
}))``;

const StyledIcon = styled(Feather)`
  color: ${Colours.neutral.white};
`;

export default EditDetailsView;
