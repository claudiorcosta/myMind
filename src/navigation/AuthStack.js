import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Registration from '../Views/Registration';
import Login from '../Views/Login';
import {GoogleSignin} from '@react-native-community/google-signin';

const Stack = createStackNavigator();

const AuthStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '939067420659-khdgdt4t542df562pjo8b9otts0pkgdp.apps.googleusercontent.com',
    });
  }, []);
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
