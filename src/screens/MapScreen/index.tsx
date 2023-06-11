import {View, Text} from 'react-native';
import React from 'react';
import MapSkeleton from 'components/Skeletons/Map';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function MapScreen() {
  return (
    <SafeAreaView>
      <MapSkeleton />
    </SafeAreaView>
  );
}
