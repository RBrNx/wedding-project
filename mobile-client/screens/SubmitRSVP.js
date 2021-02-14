import { useTheme } from '@react-navigation/native';
import { HeaderBackButton, Assets } from '@react-navigation/stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';
import Animated from 'react-native-reanimated';
import LoadingIndicator from '../components/LoadingIndicator';
import FormWizard from '../library/components/FormWizard';
import StandardActionButton from '../library/components/StandardActionButton';
import { calculateQuestions, formatRSVP } from '../library/helpers/RSVP';
import DismissKeyboard from '../components/DismissKeyboard';
import FormOverview from '../library/components/FormOverview';
import useAnimatedWizard from '../library/hooks/useAnimatedWizard';
import useLazyQuery from '../library/hooks/useLazyQuery';
import parseError from '../library/helpers/parseError';
import { useAlert } from '../context/Alert';
import { AlertType } from '../library/enums';

const { width } = Dimensions.get('window');
const GET_RSVP_QUESTIONS = loader('../graphql/queries/getRSVPQuestions.graphql');
const SUBMIT_RSVP_FORM = loader('../graphql/mutations/submitRSVP.graphql');

const SubmitRSVPScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [currQuestion, setCurrQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [rsvpForm, setRSVPForm] = useState({});
  const [formError, setFormError] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const [fetchRSVPQuestions, { loading, error }] = useLazyQuery(GET_RSVP_QUESTIONS);
  const [submitRSVPForm, { loading: submitting }] = useMutation(SUBMIT_RSVP_FORM);
  const { colors } = useTheme();
  const { showAlert } = useAlert();

  const isLoading = loading || submitting;
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

  const onSubmit = async () => {
    try {
      const formattedRSVP = formatRSVP(rsvpForm, questionHistory);
      const { data } = await submitRSVPForm({ variables: { input: { rsvpForm: formattedRSVP } } });
      const { submitRSVPForm: formResponse } = data || {};

      if (formResponse.success) {
        // Navigate
      } else {
        showAlert({
          message: formResponse.message,
          type: AlertType.WARNING,
          position: 'top',
        });
      }
    } catch (err) {
      const { message } = parseError(err);
      console.error(message);
      showAlert({
        message,
        type: AlertType.WARNING,
        position: 'top',
      });
    }
  };

  const onNext = () => {
    if (!currAnswer) {
      setFormError('Please select an answer before continuing.');
      return;
    }

    if (showOverview) {
      onSubmit();
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
      animateRSVPStep({
        fromStep: 1,
        toStep: 0,
        callback: () => {
          setQuestionHistory(questionHistory.slice(0, -1));
          setShowOverview(false);
        },
      });
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
          {isLoading && <LoadingIndicator size={100} />}
          {!isLoading && !error && (
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
