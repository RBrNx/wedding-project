import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import LoadingIndicator from 'library/components/LoadingIndicator';
import StandardActionButton from 'library/components/StandardActionButton';
import { useLazyQuery, useAvoidKeyboard, useAnimatedStepTransition, useSubmitRSVP } from 'library/hooks';
import parseError from 'library/utils/parseError';
import { useAlert } from 'context';
import { AlertType } from 'library/enums';
import BottomSheetScrollView from 'library/components/BottomSheetScrollView';
import StepTransition from 'library/components/StepTransition';
import BackButton from 'library/components/BackButton';
import BackButtonImage from 'library/components/BackButtonImage';
import { Colours } from 'library/styles';
import { SubmitRSVP } from 'library/utils/constants';
import GET_RSVP_QUESTIONS from 'library/graphql/queries/getRSVPQuestions.graphql';
import RSVPOverview from './components/RSVPOverview';
import RSVPOverviewTitle from './components/RSVPOverviewTitle';
import RSVPAnswerInput from './components/RSVPAnswerInput';
import RSVPQuestion from './components/RSVPQuestion';
import { calculateQuestions, prepareRSVPForSubmission } from './helpers';

const { width, height } = Dimensions.get('window');
const HANDLE_HEIGHT = 20;
const SHEET_COLLAPSED_POS = SubmitRSVP.QUESTION_HEIGHT;

const SubmitRSVPScreen = ({ route, navigation }) => {
  const existingRSVPAnswers = route?.params?.rsvpForm;
  const [questions, setQuestions] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [formSteps, setFormSteps] = useState([{}]);
  const [currQuestion, setCurrQuestion] = useState(null);
  const [rsvpForm, setRSVPForm] = useState({});
  const [showOverview, setShowOverview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchRSVPQuestions] = useLazyQuery(GET_RSVP_QUESTIONS);
  const [submitRSVPForm] = useSubmitRSVP();
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

    if (existingRSVPAnswers) {
      const existingRSVPForm = existingRSVPAnswers.reduce((accumulator, rsvpTuple) => {
        const { question, answer } = rsvpTuple;

        accumulator[question._id] = answer.value;
        return accumulator;
      }, {});
      setRSVPForm(existingRSVPForm);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (nextQuestion) setFormSteps([...questionHistory, currQuestion, nextQuestion]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextQuestion]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { formattedRSVP, isAttending } = prepareRSVPForSubmission(rsvpForm, questionHistory);
      const { data } = await submitRSVPForm({ variables: { input: { rsvpForm: formattedRSVP } } });
      const { submitRSVPForm: formResponse } = data || {};

      if (formResponse.success) {
        navigation.navigate('RSVPSuccess', { isAttending });
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
    if (!prevQuestion) {
      navigation.pop();
      return;
    }

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
    return (
      <RSVPQuestion
        key={`question_${step._id}`}
        question={step}
        animIndex={animIndex}
        index={index}
        isLoading={isLoading}
      />
    );
  };

  return (
    <>
      <StepTransition steps={formSteps} renderStep={renderQuestion} animIndex={animIndex} />
      <BottomSheetScrollView collapsedPosition={SHEET_COLLAPSED_POS} unlockFullScroll={!isLoading}>
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
