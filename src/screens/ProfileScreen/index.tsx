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
import {schema} from './BecomeMaster/validationSchema';
import StyledControlledTextInput from 'components/StyledControlledTextInput';
import {AppContext} from 'providers/AppProvider';
import Separator from 'components/Basic/Separator';
import PressableStyled from 'components/PressableStyled';
import MasterProfileHeader from 'screens/SalonScreen/MasterScreen/components/MasterProfileHeader';
import FloatingInfo from 'screens/SalonScreen/MasterScreen/components/FloatingInfo';
import TattoosList from 'screens/SalonScreen/MasterScreen/components/TattoosList';

export default function ProfileScreen() {
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
    <SafeAreaView style={stlyes.container}>
      <MasterProfileHeader editable />
      <FloatingInfo />
      <TattoosList editable />
    </SafeAreaView>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  container: {
    flex: 1,
  },
}));
