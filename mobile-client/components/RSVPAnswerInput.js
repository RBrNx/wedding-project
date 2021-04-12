import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components/native';
import StandardRadioInput from '../library/components/StandardRadioInput';
import AlternativeTextInput from '../library/components/AlternativeTextInput';

const { width } = Dimensions.get('window');

const RSVPAnswerInput = ({
  questionId,
  questionType,
  label,
  placeholder,
  answerChoices,
  answerValue,
  setRSVPAnswer,
  index,
  animIndex,
  style,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (index - animIndex.value) * width }],
  }));

  return (
    <Container style={[animatedStyle, style]}>
      {!!answerChoices?.length && (
        <StandardRadioInput
          options={answerChoices}
          setSelectedValue={value => setRSVPAnswer(questionId, value)}
          selectedValue={answerValue}
        />
      )}
      {questionType === 'TEXT' && (
        <AlternativeTextInput
          value={answerValue}
          label={label}
          placeholder={placeholder}
          onChangeText={value => setRSVPAnswer(questionId, value)}
          flat
          multiline
        />
      )}
    </Container>
  );
};

const Container = styled(Animated.View)`
  position: absolute;
  width: 100%;
  padding-horizontal: 5%;
  justify-content: center;
  top: -15px;
`;

export default RSVPAnswerInput;
