import { useTheme } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { constantStyles } from '../styles/theming';
import StandardButton from '../library/components/StandardButton';
import LoadingIndicator from '../components/LoadingIndicator';
import StandardPressable from '../library/components/StandardPressable';
import QuestionDisplay from '../components/QuestionDisplay';
import FormWizard from '../library/components/FormWizard';

const GET_RSVP_QUESTIONS = loader('../graphql/getRSVPQuestions.graphql');

const SubmitRSVPScreen = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(GET_RSVP_QUESTIONS);
  const { colors } = useTheme();

  const { getRSVPQuestions: questions } = data || {};

  return (
    <View style={styles.container}>
      <FormWizard navigation={navigation} data={questions} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingBottom: 30,
  },
});

export default SubmitRSVPScreen;
