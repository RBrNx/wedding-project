import { useTheme } from '@react-navigation/native';
import { HeaderBackButton, Assets } from '@react-navigation/stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../components/LoadingIndicator';
import FormWizard from '../library/components/FormWizard';
import StandardActionButton from '../library/components/StandardActionButton';
import { calculateQuestions } from '../library/helpers/RSVP';

const { width } = Dimensions.get('window');
const GET_RSVP_QUESTIONS = loader('../graphql/getRSVPQuestions.graphql');

const SubmitRSVPScreen = ({ navigation }) => {
  const [prevQuestions, setPrevQuestions] = useState([]);
  const [currQuestion, setCurrQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [rsvpForm, setRSVPForm] = useState({});
  const [formError, setFormError] = useState(null);
  const { loading, error, data } = useQuery(GET_RSVP_QUESTIONS);
  const { colors } = useTheme();

  const { getRSVPQuestions: questions } = data || {};
  const currAnswer = rsvpForm[currQuestion?._id];
  const { prevQuestion, nextQuestion } = calculateQuestions({
    questions,
    prevQuestions,
    currQuestion,
    currAnswer,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBackButton tintColor='#fff' onPress={onPrev} />,
    });
  }, [navigation, currQuestion]);

  useEffect(() => {
    if (questions) setCurrQuestion({ ...questions[0], number: questionNumber });
  }, [questions]);

  const onNext = () => {
    if (!currAnswer) {
      setFormError('Please select an answer before continuing.');
      return;
    }

    if (nextQuestion) {
      setPrevQuestions([...prevQuestions, currQuestion]);
      setCurrQuestion({ ...nextQuestion, number: questionNumber + 1 });
      setQuestionNumber(questionNumber + 1);
    }
  };

  const onPrev = () => {
    if (prevQuestion) {
      setPrevQuestions(prevQuestions.slice(0, -1));
      setCurrQuestion({ ...prevQuestion });
      setQuestionNumber(questionNumber - 1);
    }
  };

  const setFormValue = (key, value) => {
    setRSVPForm({ ...rsvpForm, [key]: value });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {loading && <LoadingIndicator size={100} />}
        {!loading && !error && currQuestion && (
          <FormWizard question={currQuestion} setFormValue={setFormValue} formValues={rsvpForm} />
        )}
      </View>
      <StandardActionButton
        icon={() => <Image source={Assets[0]} fadeDuration={0} style={styles.actionButtonIcon} />}
        maxExpansionWidth={width * 0.95 - 16}
        onPress={onNext}
        onButtonShrink={() => setFormError(null)}
        errorMessage={formError}
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
  actionButtonIcon: {
    tintColor: '#fff',
    transform: [{ rotate: '180deg' }],
  },
});

export default SubmitRSVPScreen;
