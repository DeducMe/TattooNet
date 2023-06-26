import {View, Text} from 'react-native';
import React from 'react';
import MasterProfileHeader from './components/MasterProfileHeader';
import FloatingInfo from './components/FloatingInfo';
import TattoosList from './components/TattoosList';

export default function MasterScreen({id}: {id: string}) {
  return (
    <View style={{flex: 1}}>
      {/* <MasterSkeleton /> */}
      <MasterProfileHeader />
      <FloatingInfo />
      <TattoosList id={id} />
    </View>
  );
}
