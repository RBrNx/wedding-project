import { Auth } from 'aws-amplify';
import { loader } from 'graphql.macro';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLazyQuery } from 'library/hooks';
import client from 'library/utils/apiClient';

const FETCH_TEMP_LOGIN_CREDENTIALS_MUTATION = loader('library/graphql/mutations/fetchTempLoginCredentials.graphql');
const GET_CURRENT_USER_QUERY = loader('library/graphql/queries/currentUser.graphql');

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProviderAuth = () => {
  const [user, setUser] = useState(null); // This stores the Cognito User, not the User in the DB
  const [currentUser, setCurrentUser] = useState(null);
  const [isSigningOut, setIsSigningOut] = useState(null);
  const [bootstrapComplete, setBootstrapComplete] = useState(false);
  const [fetchCurrentUser] = useLazyQuery(GET_CURRENT_USER_QUERY, { fetchPolicy: 'network-only' });
  const isAuthenticated = !!user && !!currentUser;

  const signIn = async (emailAddress, password) => {
    if (!emailAddress || !password) return null;

    const lowercaseEmail = emailAddress.toLowerCase();
    const cognitoUser = await Auth.signIn(lowercaseEmail, password);
    const { data } = await fetchCurrentUser();
    const dbUser = data?.getCurrentUser;

    setUser(cognitoUser);
    setCurrentUser(dbUser);

    return cognitoUser && dbUser;
  };

  const signInWithInvitationId = async invitationId => {
    if (!invitationId || invitationId.length !== 12) throw new Error('Invitation ID must be 12 characters long.');

    const { data } = await client.mutate({
      mutation: FETCH_TEMP_LOGIN_CREDENTIALS_MUTATION,
      variables: {
        input: {
          invitationId,
        },
      },
    });

    const { success, payload, message } = data.fetchTempLoginCredentials;

    if (success) {
      const { username, password } = payload;
      const signedIn = await signIn(username, password);
      return signedIn;
    }

    throw new Error(message);
  };

  const signOut = async () => {
    setIsSigningOut(true);
    await Auth.signOut();
    setUser(null);
    setCurrentUser(null);
    setIsSigningOut(false);
  };

  useEffect(() => {
    const checkForAuthenticatedUser = async () => {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const { data } = await fetchCurrentUser();
        const dbUser = data?.getCurrentUser;

        setUser(cognitoUser);
        setCurrentUser(dbUser);
      } catch (err) {
        console.log(err);
      } finally {
        setBootstrapComplete(true);
      }
    };

    checkForAuthenticatedUser();
  }, []);

  return {
    user,
    currentUser,
    signIn,
    signInWithInvitationId,
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
