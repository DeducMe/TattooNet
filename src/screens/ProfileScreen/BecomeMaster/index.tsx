import {View, Text, Linking} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gravatar} from 'react-native-gravatar';
import CustomText from 'components/CustomText';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {ActionButton} from 'components/ActionButton';
import useTheme from 'hooks/useTheme';
import ControlledTextInput from 'components/Basic/ControlledInputText';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from './validationSchema';
import StyledControlledTextInput from 'components/StyledControlledTextInput';
import {AppContext} from 'providers/AppProvider';
import Separator from 'components/Basic/Separator';
import PressableStyled from 'components/PressableStyled';

export default function BecomeMaster() {
  const theme = useTheme();
  const stlyes = makeStyles();
  const context = useContext(AppContext);

  function SendEmail(payload) {
    console.log(payload);
  }

  useEffect(() => {
    // get me
    context.profile.getMe();
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: 'center',
          padding: theme.space.l,
        }}>
        <CustomText h2 bold>
          Want to become a master in TattooNet?
        </CustomText>
        <CustomText>
          Write us your email and we will connect with you as soon as possible!
        </CustomText>

        <StyledControlledTextInput
          containerStyle={{marginVertical: theme.space.s}}
          staticHolder="Email"
          errorMessage={errors.email?.message || ''}
          control={control}
          name="email"
          label="Email"
        />
        <StyledControlledTextInput
          containerStyle={{marginBottom: theme.space.s}}
          hideTitle
          staticHolder="Text"
          errorMessage=""
          control={control}
          name="text"
          multiline
          inputStyle={{height: 150}}
          label="Text"></StyledControlledTextInput>

        <ActionButton
          onPress={handleSubmit(SendEmail)}
          roundButton
          title="Send!"
        />
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
            marginTop: theme.space.s,
            backgroundColor: theme.colors.primary,
          }}
        />

        <View style={{marginTop: theme.space.l, alignItems: 'center'}}>
          <CustomText h2 style={{textAlign: 'center'}}>
            Write us directly:{' '}
          </CustomText>
          <PressableStyled
            onPress={() => {
              Linking.openURL(
                `mailto:deducme@gmail.com?subject=New TattooNet master&body=Hello! I want to become a new master in TattooNet.`,
              );
            }}>
            <CustomText h2 bold style={{color: theme.colors.primary}}>
              deducme@gmail.com
            </CustomText>
          </PressableStyled>
        </View>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  userInfo: {
    width: theme.dimensions.width * 0.3,
    marginLeft: theme.space.l,
    marginRight: theme.dimensions.width * 0.15,
  },
}));
