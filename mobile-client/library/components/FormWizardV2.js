import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import useAnimatedWizardV2 from '../hooks/useAnimatedWizardV2';

const FormWizardV2 = ({ steps = [], renderStep = () => null }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const prevIndex = currIndex - 1;
  const nextIndex = currIndex + 1;

  const {
    moveToPrevStep,
    moveToNextStep,
    prevStepAnimatedStyle,
    currStepAnimatedStyle,
    nextStepAnimatedStyle,
  } = useAnimatedWizardV2({ currStep: currIndex });

  const onPrev = () => {
    if (currIndex - 1 < 0) return;

    moveToPrevStep(() => setCurrIndex(currIndex - 1));
  };

  const onNext = () => {
    if (currIndex + 1 > steps.length - 1) return;

    moveToNextStep(() => setCurrIndex(currIndex + 1));
  };

  return (
    <>
      <View style={styles.container}>
        {renderStep({ step: steps[prevIndex], animatedStyle: prevStepAnimatedStyle, stepIndex: prevIndex })}
        {renderStep({ step: steps[currIndex], animatedStyle: currStepAnimatedStyle, stepIndex: currIndex })}
        {renderStep({ step: steps[nextIndex], animatedStyle: nextStepAnimatedStyle, stepIndex: nextIndex })}
      </View>
      <Button title='Prev' onPress={onPrev} />
      <Button title='Next' onPress={onNext} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default FormWizardV2;
