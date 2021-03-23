import React, { useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminNavigator from './AdminNavigator';
import GuestNavigator from './GuestNavigator';
import { useAuth } from '../context';
import NavigationPresets from '../library/helpers/NavigationPresets';

const AuthenticatedStack = createStackNavigator();

const screenOptions = {
  ...NavigationPresets.NoHeader,
};

const AuthenticatedNavigator = () => {
  const { user } = useAuth();

  const role = useMemo(() => user?.attributes?.['custom:role'], []);

  return (
    <AuthenticatedStack.Navigator screenOptions={screenOptions}>
      {role === 'ADMIN' && <AuthenticatedStack.Screen name='Admin' component={AdminNavigator} />}
      {role === 'GUEST' && <AuthenticatedStack.Screen name='Guest' component={GuestNavigator} />}
    </AuthenticatedStack.Navigator>
  );
};

export default AuthenticatedNavigator;
