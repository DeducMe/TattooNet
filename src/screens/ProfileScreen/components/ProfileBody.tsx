import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import CustomText from 'components/CustomText';
import Separator from 'components/Basic/Separator';
import useTheme from 'hooks/useTheme';
import {ActionButton} from 'components/ActionButton';
import FloatingButton from 'components/FloatingButton';
import FloatingButtonAction from 'components/FloatingButton/FloatingButtonAction';
import IconComponent from 'components/Basic/IconComponent';
import {useNavigation} from '@react-navigation/native';

export default function ProfileBody() {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <ScrollView>
        <View style={{alignItems: 'center', flex: 1}}>
          <CustomText
            h1
            bold
            style={{
              marginTop: theme.space.l,
              marginBottom: theme.space.xl * 3,
            }}>
            Here will be all your tattoos.
          </CustomText>
          <CustomText style={{width: 300, textAlign: 'center'}}>
            You can create your own post with unknown master
          </CustomText>
          <Separator
            style={{
              width: '30%',
              alignSelf: 'center',
              marginTop: theme.space.m,
              marginBottom: theme.space.s,

              backgroundColor: theme.colors.primary,
            }}
          />

          <CustomText style={{textAlign: 'center'}} h1 bold>
            OR
          </CustomText>

          <Separator
            style={{
              width: '30%',
              alignSelf: 'center',
              marginVertical: theme.space.s,
              backgroundColor: theme.colors.primary,
            }}
          />
          <CustomText style={{width: 300, textAlign: 'center'}}>
            Search for tattoos and request master to confirm its completion
          </CustomText>
          <ActionButton
            onPress={() => navigation.navigate('Map')}
            style={{marginTop: theme.space.xs}}
            title="Find master"
            roundButton
          />
        </View>
      </ScrollView>
      <FloatingButton
        actions={[
          {
            render: () => (
              <FloatingButtonAction
                key={'addTattoo'}
                icon={
                  <IconComponent
                    iconSet="Feather"
                    color="#fff"
                    name={'plus-circle'}
                    size={25}
                  />
                }
                text={'Add tattoo'}
              />
            ),
            name: 'addTattoo',
          },
          {
            render: () => (
              <FloatingButtonAction
                key={'becomeMaster'}
                icon={
                  <IconComponent
                    iconSet="Feather"
                    color="#fff"
                    name={'pen-tool'}
                    size={25}
                  />
                }
                text={'Become master'}
              />
            ),
            name: 'becomeMaster',
          },
        ]}
        onPressItem={name => {
          if (name === 'becomeMaster') navigation.navigate('BecomeMaster', {});
        }}></FloatingButton>
    </>
  );
}
