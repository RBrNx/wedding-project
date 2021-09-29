import { useMutation } from '@apollo/react-hooks';
import SUBMIT_RSVP_FORM from 'library/graphql/mutations/submitRSVP.graphql';
import BOOTSTRAP_QUERY from 'library/graphql/queries/bootstrapQuery.graphql';

const useSubmitRSVP = (options = {}) => {
  const [submitRSVPForm, result] = useMutation(SUBMIT_RSVP_FORM, {
    ...options,
    refetchQueries: [{ query: BOOTSTRAP_QUERY, variables: { filter: { page: 0, limit: 60 } } }],
  });

  return [submitRSVPForm, result];
};

export default useSubmitRSVP;
