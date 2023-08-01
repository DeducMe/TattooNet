import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import PressableStyled from 'components/PressableStyled';
import CustomText from 'components/CustomText';
import useTheme from 'hooks/useTheme';
import {RowButton} from 'components/RowButton';
import IconComponent from 'components/Basic/IconComponent';

export default function MoreScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <SafeAreaView>
      <View style={{marginHorizontal: theme.space.xs}}>
        <RowButton
          Icon={
            <IconComponent
              style={{marginRight: theme.space.xxs}}
              iconSet="MaterialIcons"
              name={'settings'}
              size={25}
            />
          }
          title="Settings"
          onPress={() => navigation.navigate('Settings')}></RowButton>

        <RowButton
          Icon={
            <IconComponent
              style={{marginRight: theme.space.xxs}}
              iconSet="AntDesign"
              name={'heart'}
              size={25}
            />
          }
          title="Favorites"
          onPress={() => navigation.navigate('Favorites')}></RowButton>
      </View>
    </SafeAreaView>
  );
}
