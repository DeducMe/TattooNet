import React from 'react';

import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import DefaultStackNavigator from './DefaultStackNavigator';
import {ActivityIndicator} from 'react-native';
export const navigationRef = createNavigationContainerRef();

const InitialNavigator = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      // TODO цвет лучше из темы задавай, а не хардкодом (theme.colors.primary или типо того)
      fallback={<ActivityIndicator color="blue" size="large" />}>
      <DefaultStackNavigator />
    </NavigationContainer>
  );
};

export default InitialNavigator;
