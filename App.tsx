/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {AppProvider} from './src/providers/AppProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DefaultStackNavigator from 'navigation/DefaultStackNavigator';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {/* <GestureHandlerRootView style={{flex: 1}}> */}
        <AppProvider>
          <DefaultStackNavigator></DefaultStackNavigator>
        </AppProvider>
        {/* </GestureHandlerRootView> */}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
