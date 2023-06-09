import React from 'react';

import IconComponent from 'components/Basic/IconComponent';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import useTheme from 'hooks/useTheme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from 'screens/ProfileScreen';
import FavoritesScreen from 'screens/FavoritesScreen';
import FeedScreen from 'screens/FeedScreen';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export const CustomButtonTabNavigation = ({children, onPress}: any) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <Pressable style={styles.Button} onPress={onPress}>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          ...styles.shadow,
          ...styles.ViewButton,
        }}>
        {children}
      </View>
    </Pressable>
  );
};

const TabStackNavigator = () => {
  const theme = useTheme();
  const styles = makeStyles();
  // changeNavigationBarColor('#DCDCDC');
  const Tab = createBottomTabNavigator();

  const screens = [
    {
      name: 'Profile',
      component: ProfileScreen,
      options: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({focused}: any) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <IconComponent
              iconSet="Ionicons"
              name="person"
              color={focused ? '#0052D4' : '#000'}
              size={30}
            />
            <Text style={{color: focused ? '#0052D4' : '#000'}}>Profile</Text>
          </View>
        ),
      },
    },
    {
      name: 'Feed',
      component: FeedScreen,
      options: {
        tabBarIcon: ({focused}: any) => (
          <IconComponent
            iconSet="MaterialIcons"
            name="location-searching"
            color={focused ? theme.colors.background : theme.colors.textColor}
            size={50}
          />
        ),

        tabBarButton: (props: any) => <CustomButtonTabNavigation {...props} />,
      },
    },
    {
      name: 'Favorites',
      component: FavoritesScreen,
      options: {
        tabBarLabel: 'Favorites',
        tabBarIcon: ({focused}: any) => (
          <View>
            <IconComponent
              iconSet="FontAwesome5"
              name="laptop-house"
              color={
                focused ? theme.colors.activeTintColor : theme.colors.textColor
              }
              size={30}
            />
            <Text
              style={{
                color: focused
                  ? theme.colors.activeTintColor
                  : theme.colors.textColor,
              }}>
              Favorites
            </Text>
          </View>
        ),
      },
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName={screens[0].name}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          ...styles.TabNavigation,
          // bottom: insets.bottom,
        },
        tabBarHideOnKeyboard: true,
      }}>
      {screens.map(screen => (
        <Tab.Screen key={screen.name} {...screen} />
      ))}
    </Tab.Navigator>
  );
};

const makeStyles = makeStyleSheet(theme => ({
  shadow: {
    ...theme.defaultShadow,
  },
  TabNavigation: {
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    elevation: 0,
    height: theme.common.tabNavigationHeight,
    bottom: 0,
    start: 0,
    end: 0,
    position: 'absolute',
  },

  Button: {
    top: -30,
    justifyContent: 'center',
    alignContent: 'center',
  },

  ViewButton: {
    width: 75,
    height: 75,
    borderRadius: 35,
  },
}));

export default TabStackNavigator;