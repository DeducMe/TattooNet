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

export type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  TabStackNavigator: undefined;
  AllCategories: undefined;
  ModalScreen: undefined;
  AssetsDetailsScreen: any;
  AllCurrencyScreen: any;
};

function App(): JSX.Element {
  // useEffect(() => {
  //   async function checkFirstTime() {
  //     firstTime = !!(await AsyncStorage.getItem('@firstTime'));
  //     if (!firstTime) await AsyncStorage.setItem('@firstTime', 'true');
  //   }

  //   checkFirstTime();
  // }, []);
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
