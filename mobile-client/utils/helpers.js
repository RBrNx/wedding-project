import { Auth } from 'aws-amplify';

const isAuthenticatedUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();

    return !!user;
  } catch (err) {
    console.log('Error Authenticating User: ', err);
    return false;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { isAuthenticatedUser };
