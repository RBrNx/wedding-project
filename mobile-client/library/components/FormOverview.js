import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { constantStyles } from '../../styles/theming';
import Spacer from './Spacer';
import StandardRoundPressable from './StandardRoundPressable';

const FormOverview = ({ questions, formValues, onEditPress }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {questions.map(question => {
        const isMultipleChoice = question?.choices?.length;
        const formValue = formValues[question._id];
        const answer = isMultipleChoice ? question.choices.find(choice => choice._id === formValue)?.label : formValue;

        return (
          <View
            style={[styles.card, { backgroundColor: colors.card }, { ...constantStyles.cardShadow }]}
            key={question._id}
          >
            <Text style={styles.questionNumber}>{`Q${question.number}`}</Text>
            <Spacer size={5} />
            <View style={styles.textContainer}>
              <Text style={{ color: colors.secondary }}>{question.title}</Text>
              <Spacer size={5} />
              <Text style={{ color: colors.bodyText }}>{answer}</Text>
            </View>
            <StandardRoundPressable
              size={45}
              icon={() => (
                <AntDesign name='edit' color={colors.componentBackground} size={25} style={{ alignSelf: 'center' }} />
              )}
              onPress={() => onEditPress(question)}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    paddingHorizontal: '4%',
    marginBottom: 15,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  questionNumber: {
    color: '#ccc',
    alignSelf: 'flex-start',
  },
});

export default FormOverview;
