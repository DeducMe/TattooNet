import {View, Text} from 'react-native';
import React from 'react';
import SalonSkeleton from 'components/Skeletons/Salon';

export default function SalonScreen() {
  return (
    <View>
      <SalonSkeleton />
    </View>
  );
}
