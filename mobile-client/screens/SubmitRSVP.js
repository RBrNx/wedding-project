import { useTheme } from '@react-navigation/native';
import { HeaderBackButton, Assets } from '@react-navigation/stack';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../components/LoadingIndicator';
import QuestionDisplay from '../components/QuestionDisplay';
import FormWizard from '../library/components/FormWizard';
import StandardActionButton from '../library/components/StandardActionButton';

const { width } = Dimensions.get('window');
const GET_RSVP_QUESTIONS = loader('../graphql/getRSVPQuestions.graphql');

const SubmitRSVPScreen = ({ navigation }) => {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [rsvpForm, setRSVPForm] = useState({});
  const formWizardRef = useRef();
  const { loading, error, data } = useQuery(GET_RSVP_QUESTIONS);
  const { colors } = useTheme();

  const { getRSVPQuestions: questions } = data || {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBackButton tintColor='#fff' onPress={onPrev} />,
    });
  }, [navigation]);

  const onNext = () => {
    formWizardRef.current.nextStep();
  };

  const onPrev = () => {
    formWizardRef.current.prevStep();
  };

  const onStepChange = newStep => {
    setCurrQuestion(newStep);
  };

  const setFormValue = (key, value) => {
    setRSVPForm({ ...rsvpForm, [key]: value });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {loading && <LoadingIndicator size={100} />}
        {!loading && !error && (
          <FormWizard ref={formWizardRef} numSteps={questions.length} onStepChange={onStepChange}>
            <QuestionDisplay
              question={questions[currQuestion]}
              index={currQuestion + 1}
              setFormValue={setFormValue}
              formValues={rsvpForm}
            />
          </FormWizard>
        )}
      </View>
      <StandardActionButton
        icon={() => <Image source={Assets[0]} fadeDuration={0} style={styles.actionButtonIcon} />}
        maxExpansionWidth={width * 0.95 - 16}
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
