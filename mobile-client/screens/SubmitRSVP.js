import React, { useEffect, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components/native';
import LoadingIndicator from '../library/components/LoadingIndicator';
import StandardActionButton from '../library/components/StandardActionButton';
import { calculateQuestions, formatRSVP } from '../library/helpers/RSVP';
import useLazyQuery from '../library/hooks/useLazyQuery';
import parseError from '../library/helpers/parseError';
import { useAlert } from '../context';
import { AlertType } from '../library/enums';
import BottomSheetScrollView from '../library/components/BottomSheetScrollView';
import Spacer from '../library/components/Spacer';
import StepTransition from '../library/components/StepTransition';
import useAnimatedStepTransition from '../library/hooks/useAnimatedStepTransition';
import RSVPQuestion from '../components/RSVPQuestion';
import RSVPAnswerInput from '../components/RSVPAnswerInput';
import BackButton from '../library/components/BackButton';
import { RSVPOverview, RSVPOverviewTitle } from '../components/RSVPOverview';
import BackButtonImage from '../library/components/BackButtonImage';
import { Colours } from '../styles';
import useAvoidKeyboard from '../library/hooks/useAvoidKeyboard';

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
  const [showOverview, setShowOverview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchRSVPQuestions] = useLazyQuery(GET_RSVP_QUESTIONS);
  const [submitRSVPForm] = useMutation(SUBMIT_RSVP_FORM);
  const { animIndex, moveToNextStep, moveToPrevStep, moveToStep } = useAnimatedStepTransition();
  const { showAlert } = useAlert();
  const { avoidKeyboardStyle } = useAvoidKeyboard();

  const sheetMinHeight = height - SHEET_COLLAPSED_POS - HANDLE_HEIGHT;
  const currAnswer = rsvpForm[currQuestion?._id];
  const { prevQuestion, nextQuestion } = calculateQuestions({ questions, questionHistory, currQuestion, currAnswer });

  useEffect(() => {
    const fetchDataOnMount = async () => {
      setIsLoading(true);
      const { data } = await fetchRSVPQuestions();
      const { getRSVPQuestions: rsvpQuestions } = data || {};

      if (rsvpQuestions) {
        const typedQuestions = rsvpQuestions.map(question => ({ ...question, componentType: 'question' }));
        const [currQ] = typedQuestions;
        const { nextQuestion: nextQ } = calculateQuestions({
          questions: typedQuestions,
          questionHistory,
          currQuestion: currQ,
          currAnswer,
        });
        setQuestions(typedQuestions);
        setCurrQuestion(currQ);
        setFormSteps([currQ, nextQ]);
      }
      setIsLoading(false);
    };

    fetchDataOnMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (nextQuestion) setFormSteps([...questionHistory, currQuestion, nextQuestion]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextQuestion]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const formattedRSVP = formatRSVP(rsvpForm, questionHistory);
      const { data } = await submitRSVPForm({ variables: { input: { rsvpForm: formattedRSVP } } });
      const { submitRSVPForm: formResponse } = data || {};

      if (formResponse.success) {
        navigation.navigate('RSVPSuccess');
      } else {
        setIsLoading(false);
        showAlert({
          message: formResponse.message,
          type: AlertType.WARNING,
          position: 'top',
        });
      }
    } catch (err) {
      setIsLoading(false);
      const { message } = parseError(err);
      console.error(message);
      showAlert({
        message,
        type: AlertType.WARNING,
      });
    }
  };

  const onNext = () => {
    if (!currAnswer) {
      showAlert({
        message: 'Please select an answer before continuing.',
        type: AlertType.WARNING,
      });
      return;
    }

    if (!nextQuestion) {
      setShowOverview(true);
      setFormSteps([...formSteps, { componentType: 'overview' }]);
    }
    setQuestionHistory([...questionHistory, currQuestion]);

    moveToNextStep(() => {
      setCurrQuestion(nextQuestion);
    });
  };

  const onPrev = () => {
    if (!prevQuestion) return;

    if (showOverview) setShowOverview(false);

    moveToPrevStep(() => {
      setFormSteps(formSteps.slice(0, -1));
      setQuestionHistory(questionHistory.slice(0, -1));
      setCurrQuestion(prevQuestion);
    });
  };

  const onEditPress = (question, questionIndex) => {
    const sliceIndex = questionHistory.length - questionIndex;
    setShowOverview(false);

    moveToStep(questionIndex, () => {
      setFormSteps(formSteps.slice(0, -1));
      setQuestionHistory(questionHistory.slice(0, -sliceIndex));
      setCurrQuestion(question);
    });
  };

  const setFormValue = (key, value) => {
    setRSVPForm({ ...rsvpForm, [key]: value });
  };

  const renderAnswerInput = ({ step, index }) => {
    const { _id: id, type, choices, placeholder, label } = step || {};
    const answer = rsvpForm[id];

    if (step?.componentType === 'overview')
      return (
        <RSVPOverview
          key='overview'
          questions={questionHistory}
          formValues={rsvpForm}
          index={index}
          animIndex={animIndex}
          style={{ minHeight: sheetMinHeight }}
          onEditPress={onEditPress}
        />
      );
    return (
      <RSVPAnswerInput
        key={`answer_${step._id}`}
        questionId={id}
        questionType={type}
        label={label}
        placeholder={placeholder}
        answerChoices={choices}
        answerValue={answer}
        setRSVPAnswer={setFormValue}
        index={index}
        animIndex={animIndex}
        style={{ minHeight: sheetMinHeight }}
      />
    );
  };

  const renderQuestion = ({ step, index }) => {
    if (step?.componentType === 'overview')
      return <RSVPOverviewTitle key='overview' index={index} animIndex={animIndex} />;
    return <RSVPQuestion key={`question_${step._id}`} question={step} animIndex={animIndex} index={index} />;
  };

  return (
    <>
      <Spacer size={StatusBar.currentHeight} />
      {!isLoading && <StepTransition steps={formSteps} renderStep={renderQuestion} animIndex={animIndex} />}
      <BottomSheetScrollView
        topOffset={StatusBar.currentHeight}
        collapsedPosition={SHEET_COLLAPSED_POS}
        unlockFullScroll={!isLoading}
      >
        {isLoading && <StyledLoadingIndictor size={100} />}
        {!isLoading && (
          <ContentContainer>
            <StyledBackButton onPress={onPrev} />
            <StepTransition steps={formSteps} renderStep={renderAnswerInput} animIndex={animIndex} />
          </ContentContainer>
        )}
      </BottomSheetScrollView>
      <StandardActionButton
        style={avoidKeyboardStyle}
        label='Submit RSVP'
        maxExpansionWidth={width * 0.95 - 16}
        onPress={onNext}
        onFullSizePress={onSubmit}
        expandToFullSize={showOverview}
        animationDuration={300}
        icon={() => <StyledBackButtonImage />}
      />
    </>
  );
};

const ContentContainer = styled.View`
  flex: 1;
`;

const StyledLoadingIndictor = styled(LoadingIndicator)`
  flex: 1;
`;

const StyledBackButton = styled(BackButton).attrs({
  backImageStyle: {
    tintColor: Colours.secondary,
  },
})`
  position: absolute;
  z-index: 1;
`;

const StyledBackButtonImage = styled(BackButtonImage)`
  transform: rotate(180deg);
  tint-color: ${Colours.neutral.white};
`;

export default SubmitRSVPScreen;
