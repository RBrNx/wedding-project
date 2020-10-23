import { Auth } from 'aws-amplify';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
