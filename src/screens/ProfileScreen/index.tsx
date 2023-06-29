import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import useTheme from 'hooks/useTheme';
import {AppContext} from 'providers/AppProvider';
import MasterProfileHeader from 'screens/SalonScreen/MasterScreen/components/MasterProfileHeader';
import FloatingInfo from 'screens/SalonScreen/MasterScreen/components/FloatingInfo';
import TattoosList from 'screens/SalonScreen/MasterScreen/components/TattoosList';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import ProfileHeader from './components/ProfileHeader';
import ProfileBody from './components/ProfileBody';

export default function ProfileScreen() {
  const theme = useTheme();
  const stlyes = makeStyles();
  const context = useContext(AppContext);

  useEffect(() => {
    if (!context.newTattoo.loading) {
      context.myProfile.getMe();
    }
  }, [context.newTattoo.loading]);

  if (context.myProfile.loading)
    return (
      <SafeAreaView style={stlyes.container}>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={stlyes.container}>
      {context.myProfile.profile?.type === 'master' ? (
        <>
          <MasterProfileHeader editable />
          <FloatingInfo />
          <TattoosList id={context.myProfile.profile?._id} editable />
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
