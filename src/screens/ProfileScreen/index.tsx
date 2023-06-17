import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import useTheme from 'hooks/useTheme';
import {AppContext} from 'providers/AppProvider';
import MasterProfileHeader from 'screens/SalonScreen/MasterScreen/components/MasterProfileHeader';
import FloatingInfo from 'screens/SalonScreen/MasterScreen/components/FloatingInfo';
import TattoosList from 'screens/SalonScreen/MasterScreen/components/TattoosList';
import {ActivityIndicator, View} from 'react-native';
import ProfileHeader from './components/ProfileHeader';
import ProfileBody from './components/ProfileBody';

export default function ProfileScreen() {
  const theme = useTheme();
  const stlyes = makeStyles();
  const context = useContext(AppContext);

  function SendEmail(payload) {
    console.log(payload);
  }

  useEffect(() => {
    // get me
    context.profile.getMe();
  }, []);

  if (context.profile.loading)
    return (
      <SafeAreaView style={stlyes.container}>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={stlyes.container}>
      {context.profile.profile?.type === 'master' ? (
        <>
          <MasterProfileHeader editable />
          <FloatingInfo />
          <TattoosList editable />
        </>
      ) : (
        <>
          <ProfileHeader editable />
          <ProfileBody />
        </>
      )}
    </SafeAreaView>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.space.s,
  },
}));
