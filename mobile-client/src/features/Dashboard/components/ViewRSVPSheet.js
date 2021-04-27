import React from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import DashedLine from 'react-native-dashed-line';
import StandardActionButton from 'library/components/StandardActionButton';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomSheetModal from 'library/components/BottomSheetModal';
import { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const ViewRSVPSheet = ({ rsvpForm, active, onDismiss }) => {
  const scrollY = useSharedValue(0);
  const { navigate } = useNavigation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0.2, 1], [0, 1], Extrapolate.CLAMP),
      transform: [{ translateY: interpolate(scrollY.value, [0, 1], [15, 0], Extrapolate.CLAMP) }],
    };
  });

  return (
    <BottomSheetModal
      active={active}
      onDismiss={onDismiss}
      animatedIndex={scrollY}
      outerChildren={
        <StandardActionButton
          label='Edit RSVP'
          icon={() => <StyledIcon name='edit' size={20} />}
          onPress={() => navigate('SubmitRSVP', { rsvpForm })}
          style={animatedStyle}
        />
      }
    >
      <StyledBottomSheetScrollView>
        <Spacer size={15} />
        <ModalTitle>Let&apos;s see your RSVP 🎉</ModalTitle>
        <Spacer size={10} />
        <ModalSubtitle>You are free to make changes to your answers until 1st September 2021.</ModalSubtitle>
        <Spacer size={45} />
        <Card>
          {rsvpForm.map((rsvpTuple, index) => {
            const { question, answer } = rsvpTuple;

            return (
              <React.Fragment key={question._id}>
                <QuestionNumber>{`Q${index + 1}`}</QuestionNumber>
                <Spacer size={5} />
                <QuestionTitle>{question.title}</QuestionTitle>
                <Spacer size={20} />
                <AnswerText>{answer.label}</AnswerText>
                {index < rsvpForm.length - 1 && <StyledLine />}
              </React.Fragment>
            );
          })}
        </Card>
      </StyledBottomSheetScrollView>
    </BottomSheetModal>
  );
};

const StyledBottomSheetScrollView = styled(BottomSheetScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: '5%',
  },
}))``;

const ModalTitle = styled.Text`
  ${Typography.h1};
  font-size: 28px;
  color: ${Theme.headerTextColour};
`;

const ModalSubtitle = styled.Text`
  ${Typography.h4};
  color: ${Theme.detailTextColour};
  ${Typography.regularFont};
  width: 90%;
`;

const Card = styled.View`
  width: 100%;
  padding: 5%;
  margin-bottom: 10px;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const QuestionNumber = styled.Text`
  color: ${Colours.neutral.grey3};
  ${Typography.h3};
  ${Typography.regularFont};
`;

const QuestionTitle = styled.Text`
  color: ${Theme.bodyTextColour};
  ${Typography.h3};
  ${Typography.regularFont};
`;

const AnswerText = styled.Text`
  color: ${Colours.secondary};
  ${Typography.h3};
`;

const StyledIcon = styled(AntDesign)`
  color: ${Colours.neutral.white};
`;

const StyledLine = styled(DashedLine).attrs(props => ({
  dashColor: Theme.detailTextColour(props),
  dashLength: 6,
  dashThickness: 1,
  dashGap: 5,
}))`
  margin-vertical: 25px;
  overflow: hidden;
`;

export default ViewRSVPSheet;
