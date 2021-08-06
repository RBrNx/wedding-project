import { useMutation } from '@apollo/react-hooks';
import { getOperationName } from 'apollo-link';
import GET_ALL_INVITATIONS from 'library/graphql/queries/getAllInvitations.graphql';

const useInvitationMutation = (mutation, options) => {
  const [invitationMutation, result] = useMutation(mutation, {
    refetchQueries: [getOperationName(GET_ALL_INVITATIONS)],
    awaitRefetchQueries: true,
    ...options,
  });

  return [invitationMutation, result];
};

export default useInvitationMutation;
