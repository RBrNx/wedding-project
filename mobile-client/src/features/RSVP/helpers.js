const filterQuestions = (questions, { filter, sort = (a, b) => b.order - a.order, map }) => {
  const filteredQuestions = questions.filter(filter).sort(sort);

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
    answer.label = formValue.name;
    answer.value = formValue.uri;
  }

  return answer;
};

export { filterQuestions, calculateQuestions, prepareRSVPForSubmission, getAnswer };
