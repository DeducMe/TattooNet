import React, {useContext} from 'react';
import {
  TransitionPresets,
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import OnBoardingScreen from 'screens/OnBoardingScreen';
import TabStackNavigator from './TabStackNavigator';
import {TouchableOpacity} from 'react-native';
import IconComponent from 'components/Basic/IconComponent';
import {Host} from 'react-native-portalize';
import ModalScreen from 'screens/ModalScreen';
import AllCurrencyScreen from 'screens/AllCurrency';
import {AppContext} from 'providers/AppProvider';
import useTheme from 'hooks/useTheme';

const screens = [
  {
    name: 'OnBoarding',
    component: OnBoardingScreen,
    options: {headerShown: false},
  },

  {
    name: 'ModalScreen',
    component: ModalScreen,
    options: {
      presentation: 'transparentModal',
      animationEnabled: true,
      headerShown: false,
    },

    noPreset: true,
  },

  {
    name: 'AllCurrencyScreen',
    component: AllCurrencyScreen,
  },
];
// options: {presentation: 'transparentModal'},

export type RootStackParamList = {
  TabStackNavigator: undefined;
  ModalScreen: undefined;
  AllCurrencyScreen: any;
  onBoarding: any;
};

const DefaultStackNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const context = useContext(AppContext);
  const theme = useTheme();
  const Stack = createStackNavigator();

  return (
    <Host>
      <Stack.Navigator initialRouteName={screens[0].name}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={'TabStackNavigator'}
          component={TabStackNavigator}
        />
        {screens.map(screen => (
          <Stack.Screen
            //@ts-ignore
            options={{
              headerStyle: {
                backgroundColor: theme.colors.background,
                // ...theme.defaultShadow,
              },

              headerTitle: '',
              headerTitleStyle: {color: theme.colors.background},

              headerLeft: props => {
                return (
                  <TouchableOpacity
                    style={{padding: theme.space.s}}
                    onPress={() => {
                      if (navigation.canGoBack()) {
                        navigation.goBack();
                      } else navigation.navigate('TabStackNavigator');
                    }}>
                    <IconComponent
                      iconSet="Ionicons"
                      name={'arrow-back'}
                      color={theme.colors.textColor}
                      size={25}
                    />
                  </TouchableOpacity>
                );
              },

              ...(!screen.noPreset
                ? {...TransitionPresets.SlideFromRightIOS}
                : {}),
              ...screen.options,
            }}
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Stack.Navigator>
    </Host>
  );
};

export default DefaultStackNavigator;
