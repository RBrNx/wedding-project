import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StandardInput from '../library/components/StandardInput';
import StandardRadioInput from '../library/components/StandardRadioInput';

const QuestionDisplay = ({ question, setFormValue, formValues }) => {
  const formValue = formValues[question._id];

  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>{`Q${question.number}`}</Text>
      <Text style={styles.questionTitle}>{question.title}</Text>
      <View style={styles.answersContainer}>
        {!!question?.choices?.length && (
          <StandardRadioInput
            options={question.choices}
            setSelectedValue={value => setFormValue(question._id, value)}
            selectedValue={formValue}
          />
        )}
        {question.type === 'TEXT' && (
          <StandardInput
            borderColourFocused='#2991cc'
            multiline
            value={formValue}
            onChangeText={value => setFormValue(question._id, value)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionNumber: {
    fontSize: 36,
    color: '#ccc',
  },
  questionTitle: {
    fontSize: 36,
    color: '#2991cc',
  },
  answersContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuestionDisplay;
