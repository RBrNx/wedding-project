import { useMutation } from '@apollo/react-hooks';
import SUBMIT_RSVP_FORM from 'library/graphql/mutations/submitRSVP.graphql';
import GET_CURRENT_USER_QUERY from 'library/graphql/queries/currentUser.graphql';

const useSubmitRSVP = (options = {}) => {
  const [submitRSVPForm, result] = useMutation(SUBMIT_RSVP_FORM, {
    ...options,
    refetchQueries: [{ query: GET_CURRENT_USER_QUERY }],
  });

  return [submitRSVPForm, result];
};

export default useSubmitRSVP;
