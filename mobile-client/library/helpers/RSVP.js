const filterQuestions = (questions, { filter, sort = (a, b) => b.order - a.order, map }) => {
  const filteredQuestions = questions.filter(filter).sort(sort);

  if (map) return filteredQuestions.map(map);

  return filteredQuestions;
};

const calculateQuestions = ({ questions, questionHistory, currQuestion, currAnswer }) => {
  const prevQuestion = questionHistory[questionHistory.length - 1];
  let nextQuestion = null;
  const { followUpQuestions } = currQuestion || {};

  if (!questions || !currQuestion) return { prevQuestion: null, nextQuestion: null };

  // Check to see if our next question is a follow up
  if (followUpQuestions?.length) {
    [nextQuestion] = filterQuestions(followUpQuestions, {
      filter: ({ matchesChoice }) => matchesChoice === currAnswer,
      map: ({ question }) => question,
    });
  } else if (currQuestion.isFollowUp) {
    const parentQuestion = questions.find(question =>
      question.followUpQuestions.some(({ _id }) => _id === currQuestion._id),
    );

    [nextQuestion] = filterQuestions(parentQuestion.followUpQuestions, {
      filter: ({ question }) => question.order > currQuestion.order,
      map: ({ question }) => question,
    });
  }

  // If we've not found the next question already, the next question must be the next "top level" question
  if (!nextQuestion)
    [nextQuestion] = filterQuestions(questions, { filter: question => question.order > currQuestion.order });

  return { prevQuestion, nextQuestion };
};

const formatRSVP = (rsvpForm, questions) => {
  const rsvpResponses = Object.entries(rsvpForm);
  const formattedRSVP = rsvpResponses.map(([questionId, answer]) => {
    const { choices } = questions.find(question => question._id === questionId);
    const isMultipleChoice = !!choices.length;
    const textAnswer = isMultipleChoice ? choices.find(choice => choice._id === answer)?.label : answer;

    return {
      question: questionId,
      answer: textAnswer,
    };
  });

  return formattedRSVP;
};

export { filterQuestions, calculateQuestions, formatRSVP };
