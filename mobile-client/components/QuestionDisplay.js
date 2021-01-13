import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StandardRadioInput from '../library/components/StandardRadioInput';

const QuestionDisplay = ({ question, index, setFormValue, formValues }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>{`Q${index}`}</Text>
      <Text style={styles.questionTitle}>{question.title}</Text>
      {question.choices && (
        <StandardRadioInput
          options={question.choices}
          setSelectedValue={value => setFormValue(question._id, value)}
          selectedValue={formValues[question._id]}
        />
      )}
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
  choiceContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionChoice: {
    borderRadius: 5,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 15,
    width: '100%',
  },
  choiceText: {
    fontSize: 16,
  },
});

export default QuestionDisplay;
