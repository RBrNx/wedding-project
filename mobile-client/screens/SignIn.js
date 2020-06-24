import React from 'react';
import { Text, View, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

const TEST_QUERY = loader('../graphql/test.graphql');

const SignInScreen = ({ route }) => {
  const { loading, error, data } = useQuery(TEST_QUERY, { variables: { uniqueCode: 'i6k307' } });

  console.log({ loading, error, data });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>SignIn</Text>
      <Button title='Navigate to Home' onPress={() => route.params?.setIsAuthenticated(true)} />
    </View>
  );
};

export default SignInScreen;
