import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {schema} from '../validationSchema';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import LinearGradient from 'react-native-linear-gradient';
import IconComponent from 'components/Basic/IconComponent';
import {AppContext} from '../../../providers/AppProvider';
import useTheme from 'hooks/useTheme';
import {RootStackParamList} from '../../../../App';
import ControlledTextInput from 'components/Basic/ControlledInputText';
import {MainContext} from 'providers/MainProvider';

export default function SignUpScreen() {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const context = useContext(MainContext);
  const [name, setName] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isSecureTextEntry, setIsSecureEntry] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({resolver: yupResolver(schema)});

  const onSubmit = async (payload: any) => {
    context.auth.register(payload);
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.backgroundDarker]}
      useAngle={true}
      angle={135}
      angleCenter={{x: 0.5, y: 0.5}}
      style={{height: '100%'}}>
      <View style={styles.firstHeadereContainer}>
        <Text
          style={[styles.textHeader, {color: theme.colors.secondary}]}
          onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Text>
      </View>
      <View style={styles.secondHeaderContainer}>
        <Text style={[styles.textHeader, {color: theme.colors.primary}]}>
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
          <TextInput
            onChangeText={text => setName(text)}
            keyboardType={'default'}
            placeholder={'Name'}
            value={name}
          />
        </View>
        <View style={styles.errorView}>
          {typeof errors.name?.message === 'string' && (
            <Text
              style={{
                color: theme.colors.error,
                paddingBottom: 5,
                alignContent: 'flex-start',
              }}>
              {errors.name.message}
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
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.signInButton}>
          <Text
            style={{
              fontSize: theme.fontSizes.large,
              color: theme.colors.textColor,
              fontWeight: 'bold',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const makeStyles = (theme: any) =>
  StyleSheet.create({
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
      backgroundColor: theme.colors.PRIMARY,
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: '100%',
      borderRadius: 8,
      marginTop: 32,
      shadowColor: theme.colors.PRIMARY,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
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
  });
