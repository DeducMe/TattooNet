import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from 'screens/SignIn/SignInScreen/SignInScreen';
import SignUpScreen from 'screens/SignIn/SignUpScreen/SignUpScreen';
import {NavigationContainer} from '@react-navigation/native';
import InitialNavigator from '../navigation/InititalNavigator';

const Stack = createNativeStackNavigator();

// TODO надо будет когда начнешь логин/авторизацию делать разобраться с тем как у нас навигация работает
// Имеет смысл DefaultStackNavigator сделать доступным после авторизации, а в то что ниже добавить онбоардинг
// (хотя я бы его пока вообще выпилил, чтобы его не скипать каждый раз при запуске апки)

export default function AuthorizationNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
