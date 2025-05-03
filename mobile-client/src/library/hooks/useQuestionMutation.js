import { useMutation } from '@apollo/react-hooks';
import GET_RSVP_QUESTIONS from 'library/graphql/queries/getRSVPQuestions.graphql';

const useQuestionMutation = (mutation, options) => {
  const [questionMutation, result] = useMutation(mutation, {
    refetchQueries: [{ query: GET_RSVP_QUESTIONS }],
    awaitRefetchQueries: true,
    ...options,
  });

  return [questionMutation, result];
};

export default useQuestionMutation;
