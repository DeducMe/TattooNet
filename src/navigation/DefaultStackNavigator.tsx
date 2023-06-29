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
import ModalScreen from 'screens/ModalScreen';
import AllCurrencyScreen from 'screens/AllCurrency';
import {AppContext} from 'providers/AppProvider';
import useTheme from 'hooks/useTheme';
import MasterScreen from 'screens/SalonScreen/MasterScreen';
import SalonScreen from 'screens/SalonScreen';
import MapScreen from 'screens/MapScreen';
import FeedScreen from 'screens/FeedScreen';
import TattooScreen from 'screens/TattooScreen';
import AddTattooScreen from 'screens/AddTattoo';
import BecomeMasterScreen from 'screens/BecomeMasterScreen';
import ChangeAddress from 'screens/ChangeAddress';
import CompleteTattooScreen from 'screens/CompleteTattooScreen';
import FavoritesScreen from 'screens/FavoritesScreen';
import SettingsScreen from 'screens/SettingsScreen';

const screens = [
  {
    name: 'Master',
    component: MasterScreen,
  },
  // {
  //   name: 'Salon',
  //   component: SalonScreen,
  // },
  {
    name: 'Map',
    component: MapScreen,
    options: {headerShown: false},
  },
  {
    name: 'Feed',
    component: FeedScreen,
  },
  {
    name: 'Favorites',
    component: FavoritesScreen,
  },
  {
    name: 'Settings',
    component: SettingsScreen,
  },

  // {
  //   name: 'ModalScreen',
  //   component: ModalScreen,
  //   options: {
  //     presentation: 'transparentModal',
  //     animationEnabled: true,
  //     headerShown: false,
  //   },

  //   noPreset: true,
  // },

  {
    name: 'AddTattoo',
    component: AddTattooScreen,
  },
  {
    name: 'CompleteTattoo',
    component: CompleteTattooScreen,
  },

  {
    name: 'TattooScreen',
    component: TattooScreen,
  },
  {
    name: 'AllCurrencyScreen',
    component: AllCurrencyScreen,
  },
  {
    name: 'BecomeMaster',
    component: BecomeMasterScreen,
  },
  {
    name: 'ChangeAddress',
    component: ChangeAddress,
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
  const theme = useTheme();
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'TabStackNavigator'}>
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
  );
};

export default DefaultStackNavigator;
