import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminNavigator from './AdminNavigator';
import GuestNavigator from './GuestNavigator';
import { useAuth } from '../context';

const AuthenticatedStack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerShown: false,
};

const AuthenticatedNavigator = () => {
  const { user } = useAuth();

  const role = user?.attributes?.['custom:role'];

  return (
    <AuthenticatedStack.Navigator screenOptions={screenOptions}>
      {role === 'ADMIN' && <AuthenticatedStack.Screen name='Admin' component={AdminNavigator} />}
      {role === 'GUEST' && <AuthenticatedStack.Screen name='Guest' component={GuestNavigator} />}
    </AuthenticatedStack.Navigator>
  );
};

export default AuthenticatedNavigator;
