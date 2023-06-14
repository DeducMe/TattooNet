import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ActionButton} from 'components/ActionButton';

export default function MapSkeleton() {
  const navigation = useNavigation();
  return (
    <View>
      {/* <ActionButton
        title="Salon"
        onPress={() => navigation.navigate('Salon', {})}
      /> */}
      <ActionButton
        title="Master"
        onPress={() => navigation.navigate('Master', {})}
      />
      <ActionButton
        title="Feed"
        onPress={() => navigation.navigate('Feed', {})}
      />
    </View>
  );
}
