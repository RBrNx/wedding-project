import { useMutation } from '@apollo/react-hooks';
import { getOperationName } from 'apollo-link';
import ALL_GUESTS_QUERY from 'library/graphql/queries/getAllGuests.graphql';

const useGuestMutation = (mutation, options) => {
  const [guestMutation, result] = useMutation(mutation, {
    refetchQueries: [getOperationName(ALL_GUESTS_QUERY)],
    awaitRefetchQueries: true,
    ...options,
  });

  return [guestMutation, result];
};

export default useGuestMutation;
