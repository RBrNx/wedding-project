import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import StandardTextInput from '../library/components/StandardTextInput';
import StandardRadioInput from '../library/components/StandardRadioInput';

const { width } = Dimensions.get('window');

const RSVPAnswerInput = ({
  questionId,
  questionType,
  answerChoices,
  answerValue,
  setRSVPAnswer,
  index,
  animIndex,
  style,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = (index - animIndex.value) * width;

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      {!!answerChoices?.length && (
        <StandardRadioInput
          options={answerChoices}
          setSelectedValue={value => setRSVPAnswer(questionId, value)}
          selectedValue={answerValue}
        />
      )}

      {questionType === 'TEXT' && (
        <StandardTextInput
          borderColourFocused='#2991cc'
          multiline
          value={answerValue}
          onChangeText={value => setRSVPAnswer(questionId, value)}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: '5%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
});

export default RSVPAnswerInput;
