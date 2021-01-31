/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import QuestionDisplay from '../../components/QuestionDisplay';
import useAnimatedWizard from '../hooks/useAnimatedWizard';

const FormWizard = ({ question, setFormValue, formValues }) => {
  const [displayedQuestion, setDisplayedQuestion] = useState(question);
  const { animateStepChange, animatedWizardStyle } = useAnimatedWizard();

  useEffect(() => {
    if (question._id !== displayedQuestion._id) {
      animateStepChange({
        fromStep: displayedQuestion.order,
        toStep: question.order,
        callback: () => {
          setDisplayedQuestion(question);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  return (
    <Animated.View style={[styles.container, animatedWizardStyle]}>
      <QuestionDisplay question={displayedQuestion} setFormValue={setFormValue} formValues={formValues} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FormWizard;
