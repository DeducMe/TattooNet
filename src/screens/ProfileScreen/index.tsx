import {View, Text} from 'react-native';
import React from 'react';
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

export default function ProfileScreen() {
  const theme = useTheme();
  const stlyes = makeStyles();

  function SendEmail(payload) {
    console.log(payload);
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.space.l,
        }}>
        <CustomText h2 bold>
          Want to become a master in TattooNet?
        </CustomText>
        <CustomText>
          Write us an email and we will connect with you as soon as possible!
        </CustomText>

        <StyledControlledTextInput
          containerStyle={{marginVertical: theme.space.s}}
          staticHolder="Email"
          errorMessage={errors.email?.message || ''}
          control={control}
          name="email"
          label="Email"></StyledControlledTextInput>
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
