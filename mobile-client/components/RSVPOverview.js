import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components/native';
import Spacer from '../library/components/Spacer';
import StandardRoundPressable from '../library/components/StandardRoundPressable';
import { Colours, Layout, Outlines, Theme, Typography } from '../styles';

const { width } = Dimensions.get('window');

const RSVPOverviewTitle = ({ index, animIndex }) => {
  const animatedStepStyle = useAnimatedStyle(() => {
    const normalisedAnim = index - animIndex.value;
    const opacity = interpolate(normalisedAnim, [-0.5, 0, 0.5], [0, 1, 0], Extrapolate.CLAMP);
    const translateX = interpolate(normalisedAnim, [-0.5, 0, 0.5], [-15, 0, 15], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  return (
    <HeaderContainer style={animatedStepStyle}>
      <HeaderText>Please review your answers</HeaderText>
    </HeaderContainer>
  );
};

const RSVPOverview = ({ questions, formValues, onEditPress, index, animIndex, style }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (index - animIndex.value) * width }],
  }));

  return (
    <Container style={[animatedStyle, style]}>
      {questions.map((question, questionIndex) => {
        const isMultipleChoice = question?.choices?.length;
        const formValue = formValues[question._id];
        const answer = isMultipleChoice ? question.choices.find(choice => choice._id === formValue)?.label : formValue;

        return (
          <Card key={question._id}>
            <QuestionNumber>{`Q${questionIndex + 1}`}</QuestionNumber>
            <Spacer size={10} />
            <TextContainer>
              <QuestionTitle>{question.title}</QuestionTitle>
              <Spacer size={10} />
              <AnswerText>{answer}</AnswerText>
            </TextContainer>
            <StandardRoundPressable
              colour={Colours.neutral.grey3}
              size={40}
              icon={() => (
                <AntDesign name='edit' color={Colours.neutral.grey4} size={20} style={{ alignSelf: 'center' }} />
              )}
              onPress={() => onEditPress(question, questionIndex)}
            />
          </Card>
        );
      })}
    </Container>
  );
};

const HeaderContainer = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 300px;
  padding-left: 5%;
  padding-right: 15%;
  padding-bottom: 30px;
  justify-content: flex-end;
`;

const HeaderText = styled(Animated.Text)`
  ${Typography.h1}
  font-family: 'Muli_400Regular';
  color: ${Theme.headerTextColour};
`;

const Container = styled(Animated.View)`
  flex: 1;
  padding-horizontal: 5%;
  padding-top: 50px;
  ${Layout.flexCenter}
`;

const Card = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const QuestionNumber = styled.Text`
  color: ${Colours.neutral.grey3};
  align-self: flex-start;
  ${Typography.regular}
`;

const TextContainer = styled.View`
  flex: 1;
`;

const QuestionTitle = styled.Text`
  color: ${Theme.bodyTextColour};
  ${Typography.regular}
`;

const AnswerText = styled.Text`
  color: ${Colours.secondary};
  ${Typography.regular}
`;

export { RSVPOverviewTitle, RSVPOverview };
