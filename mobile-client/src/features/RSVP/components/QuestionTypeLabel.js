import StandardPillPressable from 'library/components/StandardPillPressable';
import { QuestionType } from 'library/enums';
import React from 'react';

const QuestionTypeLabel = ({ type, style, onPress }) => {
  const { color, text } = QuestionType[type];

  return <StandardPillPressable colour={color} text={text} style={style} onPress={onPress} />;
};

export default QuestionTypeLabel;
