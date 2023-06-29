import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import PressableStyled from 'components/PressableStyled';
import CustomText from 'components/CustomText';

export default function MoreScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <PressableStyled onPress={() => navigation.navigate('Settings')}>
        <CustomText h1>Settings</CustomText>
      </PressableStyled>
      <PressableStyled onPress={() => navigation.navigate('Favorites')}>
        <CustomText h1>Favorites</CustomText>
      </PressableStyled>
    </SafeAreaView>
  );
}
