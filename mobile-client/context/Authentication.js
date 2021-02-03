import { Auth } from 'aws-amplify';
import { loader } from 'graphql.macro';
import React, { createContext, useContext, useEffect, useState } from 'react';
import client from '../utils/apiClient';

const FETCH_TEMP_LOGIN_CREDENTIALS_MUTATION = loader('../graphql/mutations/fetchTempLoginCredentials.graphql');
const GET_CURRENT_USER_QUERY = loader('../graphql/queries/currentUser.graphql');

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProviderAuth = () => {
  const [user, setUser] = useState(null); // This stores the Cognito User, not the User in the DB
  const [bootstrapComplete, setBootstrapComplete] = useState(false);

  const signIn = async (emailAddress, password) => {
    if (!emailAddress || !password) return null;

    const lowercaseEmail = emailAddress.toLowerCase();
    const cognitoUser = await Auth.signIn(lowercaseEmail, password);
    setUser(cognitoUser);
    return cognitoUser;
  };

  const signInWithShortId = async shortId => {
    if (!shortId) return null;

    const { data } = await client.mutate({
      mutation: FETCH_TEMP_LOGIN_CREDENTIALS_MUTATION,
      variables: {
        input: {
          shortId,
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
    await Auth.signOut();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  useEffect(() => {
    const checkForAuthenticatedUser = async () => {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        setUser(cognitoUser);
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
    signIn,
    signInWithShortId,
    signOut,
    isAuthenticated: isAuthenticated(),
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
