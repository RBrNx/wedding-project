import React, { useEffect, useState } from 'react';
import { View, Dimensions, StatusBar, StyleSheet } from 'react-native';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';
import { useTheme } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import StandardActionButton from '../library/components/StandardActionButton';
import { calculateQuestions, formatRSVP } from '../library/helpers/RSVP';
import useLazyQuery from '../library/hooks/useLazyQuery';
import parseError from '../library/helpers/parseError';
import { useAlert } from '../context/Alert';
import { AlertType } from '../library/enums';
import AnimatedScrollview from '../library/components/AnimatedScrollview';
import Spacer from '../library/components/Spacer';
import FormWizardV2 from '../library/components/FormWizardV2';
import useAnimatedWizardV2 from '../library/hooks/useAnimatedWizardV2';
import RSVPQuestion from '../library/components/RSVPQuestion';
import RSVPAnswerInput from '../library/components/RSVPAnswerInput';
import BackButton from '../library/components/BackButton';

const { width, height } = Dimensions.get('window');
const GET_RSVP_QUESTIONS = loader('../graphql/queries/getRSVPQuestions.graphql');
const SUBMIT_RSVP_FORM = loader('../graphql/mutations/submitRSVP.graphql');
const HANDLE_HEIGHT = 20;
const SHEET_COLLAPSED_POS = 300;

const SubmitRSVPScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [formSteps, setFormSteps] = useState([]);
  const [currQuestion, setCurrQuestion] = useState(null);
  const [rsvpForm, setRSVPForm] = useState({});
  const [formError, setFormError] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const [fetchRSVPQuestions, { loading, error }] = useLazyQuery(GET_RSVP_QUESTIONS);
  const [submitRSVPForm, { loading: submitting }] = useMutation(SUBMIT_RSVP_FORM);
  const { animIndex, moveToNextStep, moveToPrevStep } = useAnimatedWizardV2();
  const { showAlert } = useAlert();
  const { colors } = useTheme();

  const isLoading = loading || submitting;
  const sheetMinHeight = height - SHEET_COLLAPSED_POS - HANDLE_HEIGHT;
  const currAnswer = rsvpForm[currQuestion?._id];
  const { prevQuestion, nextQuestion } = calculateQuestions({ questions, questionHistory, currQuestion, currAnswer });

  useEffect(() => {
    const fetchDataOnMount = async () => {
      const { data } = await fetchRSVPQuestions();
      const { getRSVPQuestions: rsvpQuestions } = data || {};

      if (rsvpQuestions) {
        const currQ = rsvpQuestions[0];
        const { nextQuestion: nextQ } = calculateQuestions({
          questions: rsvpQuestions,
          questionHistory,
          currQuestion: currQ,
          currAnswer,
        });
        setQuestions(rsvpQuestions);
        setCurrQuestion(currQ);
        setFormSteps([currQ, nextQ]);
      }
    };

    fetchDataOnMount();
  }, []);

  useEffect(() => {
    setFormSteps([...questionHistory, currQuestion, nextQuestion]);
  }, [nextQuestion]);

  // const onSubmit = async () => {
  //   try {
  //     const formattedRSVP = formatRSVP(rsvpForm, questionHistory);
  //     const { data } = await submitRSVPForm({ variables: { input: { rsvpForm: formattedRSVP } } });
  //     const { submitRSVPForm: formResponse } = data || {};

  //     if (formResponse.success) {
  //       // Navigate
  //     } else {
  //       showAlert({
  //         message: formResponse.message,
  //         type: AlertType.WARNING,
  //         position: 'top',
  //       });
  //     }
  //   } catch (err) {
  //     const { message } = parseError(err);
  //     console.error(message);
  //     showAlert({
  //       message,
  //       type: AlertType.WARNING,
  //       position: 'top',
  //     });
  //   }
  // };

  const onNextV2 = () => {
    if (!currAnswer) {
      showAlert({
        message: 'Please select an answer before continuing.',
        type: AlertType.WARNING,
      });
      return;
    }
    if (!nextQuestion) return;

    moveToNextStep(() => {
      setQuestionHistory([...questionHistory, currQuestion]);
      setCurrQuestion(nextQuestion);
    });
  };

  const onPrevV2 = () => {
    if (!prevQuestion) return;

    moveToPrevStep(() => {
      setQuestionHistory(questionHistory.slice(0, -1));
      setCurrQuestion(prevQuestion);
    });
  };

  // const onEditPress = editQuestion => {
  //   const questionIndex = questionHistory.findIndex(question => question._id === editQuestion._id);

  //   animateRSVPStep({
  //     fromStep: 1,
  //     toStep: 0,
  //     callback: () => {
  //       setCurrQuestion({ ...editQuestion });
  //       setQuestionNumber(editQuestion.number);
  //       setQuestionHistory(questionHistory.slice(0, questionIndex));
  //       setShowOverview(false);
  //     },
  //   });
  // };

  const setFormValue = (key, value) => {
    setRSVPForm({ ...rsvpForm, [key]: value });
  };

  const renderAnswerInput = ({ step, index }) => {
    const { _id: id, type, choices } = step || {};

    return (
      <RSVPAnswerInput
        key={`answer_${step._id}`}
        questionId={id}
        questionType={type}
        answerChoices={choices}
        answerValue={currAnswer}
        setRSVPAnswer={setFormValue}
        index={index}
        animIndex={animIndex}
        style={{ minHeight: sheetMinHeight }}
      />
    );
  };

  const renderQuestion = ({ step, index }) => {
    return <RSVPQuestion key={`question_${step._id}`} question={step} animIndex={animIndex} index={index} />;
  };

  return (
    <>
      <Spacer size={StatusBar.currentHeight} />
      {!isLoading && currQuestion && (
        <FormWizardV2 steps={formSteps} renderStep={renderQuestion} animIndex={animIndex} />
      )}
      <AnimatedScrollview
        topOffset={StatusBar.currentHeight}
        collapsedPosition={SHEET_COLLAPSED_POS}
        unlockFullScroll={!isLoading}
      >
        {isLoading && <LoadingIndicator size={100} />}
        {!isLoading && currQuestion && (
          <View style={styles.contentContainer}>
            <BackButton style={styles.backButton} backImageStyle={{ tintColor: colors.secondary }} onPress={onPrevV2} />
            <FormWizardV2 steps={formSteps} renderStep={renderAnswerInput} animIndex={animIndex} />
          </View>
        )}
      </AnimatedScrollview>
      <StandardActionButton
        label='Submit RSVP'
        maxExpansionWidth={width * 0.95 - 16}
        onPress={onNextV2}
        onMessageClose={() => setFormError(null)}
        errorMessage={formError}
        expandToFullButton={showOverview}
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default SubmitRSVPScreen;
