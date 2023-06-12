import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import useTheme from 'hooks/useTheme';
import DefaultStackNavigator from 'navigation/DefaultStackNavigator';
import {Host} from 'react-native-portalize';
import {AppContext} from 'providers/AppProvider';
import AuthorizationNavigator from 'navigation/AuthorizationNavigator';

export default function AppNavigationContainer() {
  const theme = useTheme();
  const context = useContext(AppContext);
  console.log(context.auth);
  return (
    <Host>
      {!!context.auth.token ? (
        <DefaultStackNavigator />
      ) : (
        <AuthorizationNavigator />
      )}
    </Host>
  );
}
