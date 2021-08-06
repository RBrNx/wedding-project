import { Auth } from 'aws-amplify';
import React, { createContext, useContext, useEffect, useState } from 'react';
import client from 'library/utils/apolloClient';
import FETCH_TEMP_LOGIN_CREDENTIALS_MUTATION from 'library/graphql/mutations/fetchTempLoginCredentials.graphql';
import GET_CURRENT_USER_QUERY from 'library/graphql/queries/currentUser.graphql';
import { useQuery } from '@apollo/react-hooks';
import parseError from 'library/utils/parseError';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProviderAuth = () => {
  const [user, setUser] = useState(null); // This stores the Cognito User, not the User in the DB
  const [isSigningOut, setIsSigningOut] = useState(null);
  const [bootstrapComplete, setBootstrapComplete] = useState(false);
  const [attemptedSignIn, setAttemptedSignIn] = useState(false);
  const { data: queryData, error } = useQuery(GET_CURRENT_USER_QUERY, { skip: !attemptedSignIn });
  const currentUser = queryData?.getCurrentUser;
  const isAuthenticated = !!user && !!currentUser;

  if (error) {
    const { message } = parseError(error);
    console.error(message);
  }

  const signIn = async (emailAddress, password) => {
    if (!emailAddress || !password) return null;

    const lowercaseEmail = emailAddress.toLowerCase();
    const cognitoUser = await Auth.signIn(lowercaseEmail, password);

    setAttemptedSignIn(true);
    setUser(cognitoUser);

    return cognitoUser;
  };

  const fetchGuestCredentials = async invitationCode => {
    if (!invitationCode || invitationCode.length !== 12) throw new Error('Invitation ID must be 12 characters long.');

    const { data } = await client.mutate({
      mutation: FETCH_TEMP_LOGIN_CREDENTIALS_MUTATION,
      variables: {
        input: {
          invitationCode,
        },
      },
    });

    const { success, payload, message } = data.fetchTempLoginCredentials;

    if (success) {
      return payload;
    }

    throw new Error(message);
  };

  const confirmSignUp = async (username, code) => {
    const res = await Auth.confirmSignUp(username, code);

    return res === 'SUCCESS';
  };

  const signOut = async () => {
    setIsSigningOut(true);
    await Auth.signOut();
    await client.clearStore();
    setUser(null);
    setIsSigningOut(false);
  };

  useEffect(() => {
    const checkForAuthenticatedUser = async () => {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();

        setUser(cognitoUser);
        setAttemptedSignIn(true);
      } catch (err) {
        console.log(err);
        setBootstrapComplete(true);
      }
    };

    checkForAuthenticatedUser();
  }, []);

  useEffect(() => {
    if (user && currentUser && !bootstrapComplete) {
      setBootstrapComplete(true);
    }
  }, [user, currentUser, bootstrapComplete]);

  return {
    user,
    currentUser,
    signIn,
    fetchGuestCredentials,
    confirmSignUp,
    signOut,
    isAuthenticated,
    isSigningOut,
    bootstrapComplete,
  };
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
