import { useTheme } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Animated, Dimensions, View, Easing } from 'react-native';
import LoadingIndicator from '../../components/LoadingIndicator';
import QuestionDisplay from '../../components/QuestionDisplay';
import StandardButton from './StandardButton';

const { width } = Dimensions.get('window');

const FormWizard = ({ navigation, data, loading }) => {
  const [currStep, setCurrStep] = useState(1);
  const [translateAction, setTranslateAction] = useState(null);
  const [currStepAnimation] = useState(new Animated.Value(0));
  const [nextStepAnimation] = useState(new Animated.Value(0));

  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBackButton tintColor='#fff' onPress={onPrev} />,
    });
  }, [navigation, onPrev, currStep]);

  useEffect(() => {
    if (translateAction === 'outLeft') {
      Animated.timing(currStepAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.in(Easing.exp),
      }).start(() => {
        onOutAnimatedComplete();
        setTranslateAction('inRight');
      });
    }

    if (translateAction === 'outRight') {
      Animated.timing(currStepAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.in(Easing.exp),
      }).start(() => {
        onOutAnimatedComplete();
        setTranslateAction('inLeft');
      });
    }

    if (translateAction === 'inRight') {
      Animated.timing(nextStepAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }).start();
    }

    if (translateAction === 'inLeft') {
      Animated.timing(nextStepAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }).start();
    }
  }, [currStepAnimation, nextStepAnimation, onOutAnimatedComplete, translateAction]);

  const onPrev = useCallback(() => {
    if (currStep <= 0) return;

    setTranslateAction('outRight');
  }, [currStep]);

  const onNext = () => {
    if (currStep === data.length - 1) return;

    setTranslateAction('outLeft');
  };

  const onOutAnimatedComplete = useCallback(() => {
    if (translateAction === 'outLeft') setCurrStep(currStep + 1);
    else if (translateAction === 'outRight') setCurrStep(currStep - 1);
  }, [currStep, translateAction]);

  const translateOutputRanges = {
    inLeft: [-width, 0],
    inRight: [width, 0],
    outLeft: [0, -width],
    outRight: [0, width],
  };

  const translateOut = currStepAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: translateOutputRanges[translateAction] || [0, 0],
    extrapolate: 'clamp',
  });

  const translateIn = nextStepAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: translateOutputRanges[translateAction] || [0, 0],
    extrapolate: 'clamp',
  });

  const opacityOut = currStepAnimation.interpolate({
    inputRange: [0, 0.75],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const opacityIn = nextStepAnimation.interpolate({
    inputRange: [0, 0.75],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateX: ['inLeft', 'inRight'].includes(translateAction) ? translateIn : translateOut }],
              opacity: ['inLeft', 'inRight'].includes(translateAction) ? opacityIn : opacityOut,
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
