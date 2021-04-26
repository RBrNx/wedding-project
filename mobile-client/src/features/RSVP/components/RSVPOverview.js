import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components/native';
import theme from 'styled-theming';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import StandardPressable from 'library/components/StandardPressable';
import { darken } from 'library/utils/colours';

const { width } = Dimensions.get('window');

const RSVPOverview = ({ questions, formValues, onEditPress, index, animIndex, style }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (index - animIndex.value) * width }],
  }));

  return (
    <Container style={[animatedStyle, style]}>
      {questions.map((question, questionIndex) => {
        const isMultipleChoice = question?.choices?.length;
        const formValue = formValues[question._id];
        const answer = isMultipleChoice
          ? question.choices.find(choice => choice.value === formValue)?.label
          : formValue;

        return (
          <Card key={question._id}>
            <QuestionNumber>{`Q${questionIndex + 1}`}</QuestionNumber>
            <Spacer size={10} />
            <TextContainer>
              <QuestionTitle>{question.title}</QuestionTitle>
              <Spacer size={10} />
              <AnswerText>{answer}</AnswerText>
            </TextContainer>
            <EditButton size={40} onPress={() => onEditPress(question, questionIndex)}>
              <StyledIcon name='edit' size={20} />
            </EditButton>
          </Card>
        );
      })}
    </Container>
  );
};

const Container = styled(Animated.View)`
  flex: 1;
  padding-horizontal: 5%;
  padding-top: 60px;
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
  color: ${Colours.neutral.grey2};
  align-self: flex-start;
  ${Typography.body}
`;

const TextContainer = styled.View`
  flex: 1;
`;

const QuestionTitle = styled.Text`
  color: ${Theme.bodyTextColour};
  ${Typography.body}
`;

const AnswerText = styled.Text`
  color: ${Colours.secondary};
  ${Typography.body}
`;

const editButtonTheme = theme('theme', {
  light: Colours.neutral.grey2,
  dark: Colours.neutral.grey4,
});
const EditButton = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: darken(editButtonTheme(props), 0.2),
  },
}))`
  background-color: ${editButtonTheme};
  ${Layout.flexCenter};
  ${props => Layout.round(props.size)}
`;

const StyledIcon = styled(AntDesign).attrs(props => ({
  color: theme('theme', {
    light: Colours.neutral.grey4,
    dark: Colours.neutral.grey3,
  })(props),
}))`
  align-self: center;
`;

export default RSVPOverview;
