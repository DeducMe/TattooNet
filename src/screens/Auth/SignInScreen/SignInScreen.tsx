import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ControlledTextInput from 'components/Basic/ControlledInputText';
import {useForm} from 'react-hook-form';
import {schema} from '../validationSchema';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import IconComponent from 'components/Basic/IconComponent';

import {AppContext} from '../../../providers/AppProvider';
import {apiRequest} from '../../../common/config';
import useTheme from 'hooks/useTheme';
import {RootStackParamList} from '../../../../App';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {ActionButton} from 'components/ActionButton';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export default function SignInScreen() {
  const theme = useTheme();
  const styles = makeStyles();
  const context = useContext(AppContext);
  const [isSecureTextEntry, setIsSecureEntry] = useState(true);

  // changeNavigationBarColor('#000');
  // StatusBar.setTranslucent(true);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({resolver: yupResolver(schema)});

  const onSubmit = async (payload: any) => {
    await context.auth.login(payload);
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.backgroundDarker]}
      useAngle={true}
      angle={135}
      angleCenter={{x: 0.5, y: 0.5}}
      style={{flex: 1}}>
      <View style={styles.firstHeadereContainer}>
        <Text style={[styles.textHeader, {color: theme.colors.primary}]}>
          Sign In
        </Text>
      </View>
      <View style={styles.secondHeaderContainer}>
        <Text
          style={[styles.textHeader, {color: theme.colors.secondary}]}
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </View>
      <View style={styles.container}>
        <View
          style={[
            styles.inputContainer,
            {
              borderBottomColor: errors.email?.message
                ? theme.colors.error
                : theme.colors.backgroundDarker,
            },
          ]}>
          <ControlledTextInput
            control={control}
            name="email"
            label="email"
            keyboardType={'default'}
            errorMessage={''}
            staticHolder={'Email'}
          />
        </View>
        <View style={styles.errorView}>
          {typeof errors.email?.message === 'string' && (
            <Text
              style={{
                color: theme.colors.error,
                paddingBottom: 5,
                alignContent: 'flex-start',
              }}>
              {errors.email.message}
            </Text>
          )}
        </View>
        <View
          style={[
            styles.inputContainer,
            {
              borderBottomColor: errors.email?.message
                ? theme.colors.error
                : theme.colors.backgroundDarker,
              justifyContent: 'space-between',
            },
          ]}>
          <ControlledTextInput
            control={control}
            secureTextEntry={isSecureTextEntry}
            name="password"
            label="password"
            keyboardType={'default'}
            errorMessage={''}
            staticHolder={'Password'}
          />
          <View style={{alignSelf: 'center'}}>
            <Pressable
              onPress={() => {
                setIsSecureEntry(prev => !prev);
              }}>
              <IconComponent
                iconSet="Ionicons"
                name={isSecureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                color={theme.colors.backgroundDarker}
                size={25}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.errorView}>
          {typeof errors.password?.message === 'string' && (
            <Text
              style={{
                color: theme.colors.error,
                alignContent: 'flex-start',
              }}>
              {errors.password.message}
            </Text>
          )}
        </View>
        <View style={styles.forgotPasswordView}>
          <Pressable>
            {({pressed}) => (
              <Text
                style={{
                  fontSize: theme.fontSizes.small,
                  color: pressed
                    ? theme.colors.primary
                    : theme.colors.textColor,
                }}>
                Forgot Password?
              </Text>
            )}
          </Pressable>
        </View>
        <ActionButton
          loading={context.auth.loading}
          onPress={handleSubmit(onSubmit)}
          style={styles.signInButton}
          title="Sign In"
          textStyle={{
            fontSize: theme.fontSizes.large,
            color: '#fff',
            fontWeight: theme.fontWeights.bold,
          }}
        />
        <View style={{alignSelf: 'center'}}>
          <Pressable
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            {({pressed}) => (
              <Text
                style={{
                  marginTop: 20,
                  fontSize: theme.fontSizes.medium,
                  color: pressed
                    ? theme.colors.primary
                    : theme.colors.textColor,
                }}>
                Don't have an account?
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  container: {
    marginTop: 120,
    alignItems: 'center',
    marginStart: 16,
    marginEnd: 16,
  },
  firstHeadereContainer: {
    marginStart: 30,
    marginTop: 80,
  },
  secondHeaderContainer: {
    marginStart: 30,
    marginTop: -10,
  },
  textHeader: {
    fontSize: 50,
    fontWeight: '600',
  },
  inputContainer: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingStart: 8,
    borderBottomColor: theme.colors.backgroundDarker,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    borderRadius: 8,
    marginTop: 32,
    ...theme.defaultShadow,
    elevation: 12,
  },
  forgotPasswordView: {
    alignSelf: 'flex-end',
    marginTop: -4,
  },
  errorView: {
    alignSelf: 'flex-start',
    height: 25,
  },
}));
