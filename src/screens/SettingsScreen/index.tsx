import {View, Text, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import PressableStyled from 'components/PressableStyled';
import CustomText from 'components/CustomText';
import {MainContext} from 'providers/MainProvider';

export default function SettingsScreen() {
  const context = useContext(MainContext);
  return (
    <SafeAreaView>
      <PressableStyled onPress={context.auth.logout}>
        <CustomText>Logout</CustomText>
      </PressableStyled>
    </SafeAreaView>
  );
}
