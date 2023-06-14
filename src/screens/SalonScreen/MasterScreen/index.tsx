import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gravatar} from 'react-native-gravatar';
import CustomText from 'components/CustomText';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {ActionButton} from 'components/ActionButton';
import MasterProfileHeader from './components/MasterProfileHeader';
import FloatingInfo from './components/FloatingInfo';
import TattoosList from './components/TattoosList';

export default function MasterScreen() {
  return (
    <View style={{flex: 1}}>
      {/* <MasterSkeleton /> */}
      <MasterProfileHeader />
      <FloatingInfo />
      <TattoosList />
    </View>
  );
}
