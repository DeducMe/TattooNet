import {View, Text} from 'react-native';
import React from 'react';
import useTheme from 'hooks/useTheme';
import DefaultStackNavigator from 'navigation/DefaultStackNavigator';
import {Host} from 'react-native-portalize';

export default function AppNavigationContainer() {
  const theme = useTheme();

  return (
    <Host>
      <DefaultStackNavigator />
    </Host>
  );
}
