import { useTheme } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import LoadingIndicator from '../../components/LoadingIndicator';
import QuestionDisplay from '../../components/QuestionDisplay';
import useAnimatedWizard from '../hooks/useAnimatedWizard';
import StandardButton from './StandardButton';

const FormWizard = ({ navigation, data, loading }) => {
  const [currStep, setCurrStep] = useState(0);
  const { colors } = useTheme();

  const {
    setTranslateAction,
    translateAction,
    translateIn,
    translateOut,
    opacityIn,
    opacityOut,
    TranslateAction,
    animationDuration,
  } = useAnimatedWizard();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBackButton tintColor='#fff' onPress={onPrev} />,
    });
  }, [navigation, onPrev, currStep]);

  const onPrev = useCallback(() => {
    if (currStep <= 0) return;

    setTranslateAction(TranslateAction.OUT_RIGHT);
    setTimeout(() => setCurrStep(currStep - 1), animationDuration);
  }, [TranslateAction.OUT_RIGHT, animationDuration, currStep, setTranslateAction]);

  const onNext = () => {
    if (currStep === data.length - 1) return;

    setTranslateAction(TranslateAction.OUT_LEFT);
    setTimeout(() => setCurrStep(currStep + 1), animationDuration);
  };

  return (
    <>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                { translateX: ['IN_LEFT', 'IN_RIGHT'].includes(translateAction) ? translateIn : translateOut },
              ],
              opacity: ['IN_LEFT', 'IN_RIGHT'].includes(translateAction) ? opacityIn : opacityOut,
            },
          ]}
        >
          {loading && <LoadingIndicator size={100} />}
          {!loading && data && <QuestionDisplay question={data[currStep]} index={currStep + 1} />}
        </Animated.View>
      </View>
      <StandardButton text='Next' style={{ marginTop: 30 }} onPress={onNext} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: '100%',
    borderRadius: 15,
    marginBottom: 30,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    overflow: 'hidden',
  },
});

export default FormWizard;
