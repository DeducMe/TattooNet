/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {AppProvider} from './src/providers/AppProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigationContainer from 'AppNavigationContainer';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <GestureHandlerRootView style={{flex: 1}}> */}
        <AppProvider>
          <AppNavigationContainer />
        </AppProvider>
        {/* </GestureHandlerRootView> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
