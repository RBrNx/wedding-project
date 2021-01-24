/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import QuestionDisplay from '../../components/QuestionDisplay';
import useAnimatedWizard from '../hooks/useAnimatedWizard';

const FormWizard = ({ question, setFormValue, formValues }) => {
  const [displayedQuestion, setDisplayedQuestion] = useState(question);
  const { setTranslateAction, animationDuration, animatedWizardStyle, TranslateAction } = useAnimatedWizard();

  useEffect(() => {
    const { order: displayedIndex } = displayedQuestion;
    const { order: newIndex } = question;

    if (newIndex > displayedIndex) setTranslateAction(TranslateAction.NEXT);
    else if (newIndex < displayedIndex) setTranslateAction(TranslateAction.PREV);

    setTimeout(() => {
      setDisplayedQuestion(question);
    }, animationDuration / 2);
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
