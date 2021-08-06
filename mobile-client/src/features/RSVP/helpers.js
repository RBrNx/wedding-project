const filterQuestions = (questions, { filter, sort = (a, b) => a.order - b.order, map }) => {
  const filteredQuestions = questions.sort(sort).filter(filter);

  if (map) return filteredQuestions.map(map);

  return filteredQuestions;
};

const calculateQuestions = ({ questions, questionHistory, currQuestion, answers }) => {
  const currAnswer = answers?.[currQuestion?._id];
  const prevQuestion = questionHistory[questionHistory.length - 1];
  let nextQuestion = null;
  const { followUpQuestions } = currQuestion || {};

  if (!questions || !currQuestion) return { prevQuestion, nextQuestion: null };

  // Check to see if our next question is a follow up to our current question
  if (followUpQuestions?.length) {
    [nextQuestion] = filterQuestions(followUpQuestions, {
      sort: (a, b) => a.question.order - b.question.order,
      filter: ({ matchesValue }) => matchesValue === currAnswer,
      map: ({ question }) => question,
    });
  } else if (currQuestion.isFollowUp) {
    // If the current question is a follow up, check for question siblings
    const parentQuestion = questions.find(question =>
      question.followUpQuestions.some(({ question: followUpQuestion }) => followUpQuestion._id === currQuestion._id),
    );
    const parentAnswer = answers[parentQuestion._id];

    [nextQuestion] = filterQuestions(parentQuestion.followUpQuestions, {
      sort: (a, b) => a.question.order - b.question.order,
      filter: ({ question, matchesValue }) => matchesValue === parentAnswer && question.order > currQuestion.order,
      map: ({ question }) => question,
    });
  }

  // If we've not found the next question already, the next question must be the next "top level" question
  if (!nextQuestion)
    [nextQuestion] = filterQuestions(questions, { filter: question => question.order > currQuestion.order });

  return { prevQuestion, nextQuestion };
};

const prepareRSVPForSubmission = (rsvpForm, questions) => {
  let isAttending = false;

  const formattedRSVP = questions.map(question => {
    const { label, value } = getAnswer(question, rsvpForm);

    if (!isAttending) isAttending = question.type === 'ATTENDANCE' && value === 'ATTENDING';

    return {
      question: question._id,
      answer: {
        label,
        value,
      },
    };
  });

  return { formattedRSVP, isAttending };
};

const getAnswer = (question, rsvpForm) => {
  const { type } = question;
  const formValue = rsvpForm[question._id];
  const answer = {
    label: null,
    value: null,
  };

  if (type === 'MULTIPLE_CHOICE' || type === 'ATTENDANCE') {
    answer.label = question.choices.find(choice => choice.value === formValue)?.label;
    answer.value = formValue;
  } else if (type === 'TEXT') {
    answer.label = formValue;
    answer.value = formValue;
  } else if (type === 'SONG_REQUEST') {
    answer.label = `${formValue.name} - ${formValue.artists.join(', ')}`;
    answer.value = formValue.uri;
  }

  return answer;
};

const toOrdinalSuffix = num => {
  const int = parseInt(num);
  const digits = [int % 10, int % 100];
  const ordinals = ['st', 'nd', 'rd', 'th'];
  const oPattern = [1, 2, 3, 4];
  const tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

const getRequiredAnswer = (parentQuestion, matchesValue) => {
  const matchingChoice = parentQuestion.choices.find(choice => choice.value === matchesValue);

  return matchingChoice;
};

export { filterQuestions, calculateQuestions, prepareRSVPForSubmission, getAnswer, toOrdinalSuffix, getRequiredAnswer };
