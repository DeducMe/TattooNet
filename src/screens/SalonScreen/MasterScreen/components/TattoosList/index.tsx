import {View, Text} from 'react-native';
import React from 'react';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import useTheme from 'hooks/useTheme';
import Portfolio from './Portfolio';
import Available from './Available';
import Reviews from './Reviews';
import CustomText from 'components/CustomText';

const Tab = createMaterialTopTabNavigator();
export default function TattoosList() {
  const styles = makeStyles();
  const theme = useTheme();

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: theme.colors.background,
      }}
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: theme.fontSizes.xsmall,
        },

        tabBarContentContainerStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarStyle: {backgroundColor: theme.colors.primary},
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
      }}>
      <Tab.Screen key={'key'} name={'Portfolio'} component={Portfolio} />
      <Tab.Screen key={'key'} name={'Available'} component={Available} />
      <Tab.Screen key={'key'} name={'Reviews'} component={Reviews} />
    </Tab.Navigator>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  userInfo: {
    width: theme.dimensions.width * 0.3,
    marginLeft: theme.space.l,
    marginRight: theme.dimensions.width * 0.15,
  },

  followButton: {
    marginTop: theme.space.s,
  },
  floatingInfo: {
    width: '85%',
    alignSelf: 'center',
    padding: theme.space.s,
    borderRadius: theme.space.s,
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    ...theme.defaultShadow,
  },
  floatingInfoItem: {
    alignItems: 'center',
    width: '20%',
  },
  floatingInfoItemBottomText: {
    textAlign: 'center',
  },
}));
