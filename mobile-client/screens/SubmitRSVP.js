import { useTheme } from '@react-navigation/native';
import { HeaderBackButton, Assets } from '@react-navigation/stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import Animated from 'react-native-reanimated';
import LoadingIndicator from '../components/LoadingIndicator';
import FormWizard from '../library/components/FormWizard';
import StandardActionButton from '../library/components/StandardActionButton';
import { calculateQuestions } from '../library/helpers/RSVP';
import DismissKeyboard from '../components/DismissKeyboard';
import FormOverview from '../library/components/FormOverview';
import useAnimatedWizard from '../library/hooks/useAnimatedWizard';
import useLazyQuery from '../library/hooks/useLazyQuery';

const { width } = Dimensions.get('window');
const GET_RSVP_QUESTIONS = loader('../graphql/queries/getRSVPQuestions.graphql');

const SubmitRSVPScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [currQuestion, setCurrQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [rsvpForm, setRSVPForm] = useState({});
  const [formError, setFormError] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const [fetchRSVPQuestions, { loading, error }] = useLazyQuery(GET_RSVP_QUESTIONS);
  const { colors } = useTheme();

  const currAnswer = rsvpForm[currQuestion?._id];
  const { animateStepChange: animateRSVPStep, animatedWizardStyle } = useAnimatedWizard();
  const { prevQuestion, nextQuestion } = calculateQuestions({
    questions,
    questionHistory,
    currQuestion,
    currAnswer,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBackButton tintColor='#fff' onPress={onPrev} />,
    });
  }, [navigation, currQuestion, showOverview]);

  useEffect(() => {
    const fetchDataOnMount = async () => {
      const { data } = await fetchRSVPQuestions();
      const { getRSVPQuestions: rsvpQuestions } = data || {};

      if (rsvpQuestions) {
        setQuestions(rsvpQuestions);
        setCurrQuestion({ ...rsvpQuestions[0], number: questionNumber });
      }
    };

    fetchDataOnMount();
  }, []);

  const onNext = () => {
    if (!currAnswer) {
      setFormError('Please select an answer before continuing.');
      return;
    }

    if (showOverview) {
      // Submit Answers
    } else if (nextQuestion) {
      setQuestionHistory([...questionHistory, currQuestion]);
      setCurrQuestion({ ...nextQuestion, number: questionNumber + 1 });
      setQuestionNumber(questionNumber + 1);
    } else {
      setQuestionHistory([...questionHistory, currQuestion]);
      animateRSVPStep({ fromStep: 0, toStep: 1, callback: () => setShowOverview(true) });
    }
  };

  const onPrev = () => {
    if (showOverview) {
      setQuestionHistory(questionHistory.slice(0, -1));
      animateRSVPStep({ fromStep: 1, toStep: 0, callback: () => setShowOverview(false) });
    } else if (prevQuestion) {
      setQuestionHistory(questionHistory.slice(0, -1));
      setCurrQuestion({ ...prevQuestion });
      setQuestionNumber(questionNumber - 1);
    }
  };

  const onEditPress = editQuestion => {
    const questionIndex = questionHistory.findIndex(question => question._id === editQuestion._id);

    animateRSVPStep({
      fromStep: 1,
      toStep: 0,
      callback: () => {
        setCurrQuestion({ ...editQuestion });
        setQuestionNumber(editQuestion.number);
        setQuestionHistory(questionHistory.slice(0, questionIndex));
        setShowOverview(false);
      },
    });
  };

  const setFormValue = (key, value) => {
    setRSVPForm({ ...rsvpForm, [key]: value });
  };

  return (
    <View style={styles.container}>
      <DismissKeyboard>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {loading && <LoadingIndicator size={100} />}
          {!loading && !error && (
            <Animated.View style={[styles.rsvpFormContainer, animatedWizardStyle]}>
              {currQuestion && !showOverview && (
                <FormWizard question={currQuestion} setFormValue={setFormValue} formValues={rsvpForm} />
              )}
              {showOverview && (
                <FormOverview questions={questionHistory} formValues={rsvpForm} onEditPress={onEditPress} />
              )}
            </Animated.View>
          )}
        </View>
      </DismissKeyboard>
      <StandardActionButton
        icon={() => <Image source={Assets[0]} fadeDuration={0} style={styles.actionButtonIcon} />}
        label='Submit RSVP'
        maxExpansionWidth={width * 0.95 - 16}
        onPress={onNext}
        onMessageClose={() => setFormError(null)}
        errorMessage={formError}
        expandToFullButton={showOverview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingBottom: 56,
  },
  card: {
    width: '100%',
    borderRadius: 15,
    marginBottom: 30,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  rsvpFormContainer: {
    width: '100%',
    flex: 1,
  },
  actionButtonIcon: {
    tintColor: '#fff',
    transform: [{ rotate: '180deg' }],
  },
});

export default SubmitRSVPScreen;
