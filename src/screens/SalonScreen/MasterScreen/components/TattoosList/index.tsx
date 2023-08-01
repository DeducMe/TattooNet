import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import useTheme from 'hooks/useTheme';
import Portfolio from './Portfolio';
import Available from './Available';
import Reviews from './Reviews';
import {AppContext} from 'providers/AppProvider';

function TattoosList({editable, id}: {editable?: boolean; id: string}) {
  const styles = makeStyles();
  const theme = useTheme();
  const context = useContext(AppContext);

  useEffect(() => {
    console.log('REQUEST IN USEEFFECT');
    editable
      ? context.tattoos.getMyTattoos({id})
      : context.tattoos.getTattoos({id});
    editable
      ? context.reviews.getMyReviews({id})
      : context.reviews.getReviews({id});
    return () => {
      context.master.nullifyMaster();
      context.tattoos.nullifyTattoos();
      context.reviews.nullifyReviews();
    };
  }, []);

  const Tab = createMaterialTopTabNavigator();

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
      <Tab.Screen
        key={'key'}
        name={'Portfolio'}
        component={Portfolio}
        initialParams={{editable}}
      />
      <Tab.Screen
        key={'key'}
        name={'Available'}
        component={Available}
        initialParams={{editable}}
      />
      <Tab.Screen
        key={'key'}
        name={'Reviews'}
        initialParams={{master: editable}}
        component={Reviews}
      />
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

export default React.memo(TattoosList);
