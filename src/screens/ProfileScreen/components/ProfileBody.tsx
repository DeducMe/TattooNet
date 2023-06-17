import {View, Text} from 'react-native';
import React from 'react';
import CustomText from 'components/CustomText';
import Separator from 'components/Basic/Separator';
import useTheme from 'hooks/useTheme';
import {ActionButton} from 'components/ActionButton';
import FloatingButton from 'components/FloatingButton';
import FloatingButtonAction from 'components/FloatingButton/FloatingButtonAction';
import IconComponent from 'components/Basic/IconComponent';

export default function ProfileBody() {
  const theme = useTheme();
  return (
    <>
      <View style={{alignItems: 'center', flex: 1}}>
        <CustomText h1 bold style={{marginBottom: theme.space.xl * 3}}>
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
          style={{marginTop: theme.space.xs}}
          title="Find master in our app"
          roundButton
        />
      </View>
      <FloatingButton
        actions={[
          {
            render: () => (
              <FloatingButtonAction
                key={'contact'}
                icon={
                  <IconComponent
                    iconSet="FontAwesome"
                    color="#fff"
                    name={'user-o'}
                    size={25}
                  />
                }
                text={'Add Tattoo'}
              />
            ),
            name: 'contact',
          },
        ]}
        onPressItem={item => console.log(item, 'add item')}></FloatingButton>
    </>
  );
}
