import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import useAnimatedWizard from '../hooks/useAnimatedWizard';

const FormWizard = forwardRef(({ children, onStepChange, numSteps }, ref) => {
  const [currStep, setCurrStep] = useState(0);
  const { setTranslateAction, animationDuration, animatedWizardStyle, TranslateAction } = useAnimatedWizard();

  const prevStep = () => {
    if (currStep <= 0) return;

    const newStep = currStep - 1;

    setTranslateAction(TranslateAction.PREV);
    setCurrStep(newStep);
    setTimeout(() => onStepChange(newStep), animationDuration / 2);
  };

  const nextStep = () => {
    if (currStep === numSteps - 1) return;

    const newStep = currStep + 1;

    setTranslateAction(TranslateAction.NEXT);
    setCurrStep(newStep);
    setTimeout(() => onStepChange(newStep), animationDuration / 2);
  };

  useImperativeHandle(ref, () => ({
    nextStep,
    prevStep,
  }));

  return <Animated.View style={[styles.container, animatedWizardStyle]}>{children}</Animated.View>;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FormWizard;
