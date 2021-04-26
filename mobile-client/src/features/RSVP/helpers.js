const filterQuestions = (questions, { filter, sort = (a, b) => b.order - a.order, map }) => {
  const filteredQuestions = questions.filter(filter).sort(sort);

  if (map) return filteredQuestions.map(map);

  return filteredQuestions;
};

const calculateQuestions = ({ questions, questionHistory, currQuestion, currAnswer }) => {
  const prevQuestion = questionHistory[questionHistory.length - 1];
  let nextQuestion = null;
  const { followUpQuestions } = currQuestion || {};

  if (!questions || !currQuestion) return { prevQuestion, nextQuestion: null };

  // Check to see if our next question is a follow up
  if (followUpQuestions?.length) {
    [nextQuestion] = filterQuestions(followUpQuestions, {
      filter: ({ matchesValue }) => matchesValue === currAnswer,
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

const prepareRSVPForSubmission = (rsvpForm, questions) => {
  let isAttending = null;
  const rsvpResponses = Object.entries(rsvpForm);
  const formattedRSVP = rsvpResponses.reduce((accumulator, currResponse) => {
    const [questionId, answer] = currResponse;
    const matchingQuestion = questions.find(question => question._id === questionId);

    if (matchingQuestion) {
      if (!isAttending) isAttending = matchingQuestion.type === 'ATTENDANCE' && answer === 'ATTENDING';

      const isMultipleChoice = !!matchingQuestion.choices.length;
      const answerLabel = isMultipleChoice
        ? matchingQuestion.choices.find(choice => choice.value === answer)?.label
        : answer;

      accumulator.push({
        question: questionId,
        answer: {
          label: answerLabel,
          value: answer,
        },
      });
    }

    return accumulator;
  }, []);

  return { formattedRSVP, isAttending };
};

export { filterQuestions, calculateQuestions, prepareRSVPForSubmission };
