import {View, Text} from 'react-native';
import React from 'react';
import useTheme from 'hooks/useTheme';
import {ThemeProvider} from '@rneui/themed';
import DefaultStackNavigator from 'navigation/DefaultStackNavigator';

export default function AppNavigationContainer() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme.themeProviderProp}>
      <DefaultStackNavigator />
    </ThemeProvider>
  );
}
