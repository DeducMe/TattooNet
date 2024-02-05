import React, {useContext, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

import ControlledTextInput from 'components/Basic/ControlledInputText';
import IconComponent from 'components/Basic/IconComponent';
import {ActionButton} from 'components/ActionButton';

import useTheme from 'hooks/useTheme';
import {MainContext} from 'providers/MainProvider';
import {schema} from '../validationSchema';
import {RootStackParamList} from '../../../../App';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

// Smaller component for the header
function Header({
  text,
  color,
  onPress,
}: {
  text: string;
  color: string;
  onPress?: () => void;
}) {
  const styles = makeStyles();

  return (
    <Pressable onPress={onPress} style={styles.firstHeadereContainer}>
      <Text style={[styles.textHeader, {color}]}>{text}</Text>
    </Pressable>
  );
}

// Smaller component for the input field
function InputField({
  control,
  name,
  label,
  keyboardType,
  errorMessage,
  staticHolder,
  isSecureTextEntry,
  setIsSecureEntry,
}) {
  const theme = useTheme();
  const styles = makeStyles();

  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderBottomColor: errorMessage
            ? theme.colors.error
            : theme.colors.backgroundDarker,
          justifyContent: isSecureTextEntry ? 'space-between' : 'flex-start',
        },
      ]}>
      <ControlledTextInput
        control={control}
        secureTextEntry={isSecureTextEntry}
        name={name}
        label={label}
        keyboardType={keyboardType}
        errorMessage={errorMessage}
        staticHolder={staticHolder}
      />
      {isSecureTextEntry && (
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
      )}
    </View>
  );
}

// Smaller component for the error message
function ErrorMessage({message}) {
  const theme = useTheme();
  const styles = makeStyles();

  return (
    <View style={styles.errorView}>
      {typeof message === 'string' && (
        <Text
          style={{
            color: theme.colors.error,
            paddingBottom: 5,
            alignContent: 'flex-start',
          }}>
          {message}
        </Text>
      )}
    </View>
  );
}

export default function SignInScreen() {
  const theme = useTheme();
  const styles = makeStyles();
  const context = useContext(MainContext);
  const [isSecureTextEntry, setIsSecureEntry] = useState(true);

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
      <Header text="Sign In" color={theme.colors.primary} />
      <Header
        text="Sign Up"
        color={theme.colors.secondary}
        onPress={() => navigation.navigate('SignUp')}
      />
      <View style={styles.container}>
        <InputField
          control={control}
          name="email"
          label="email"
          keyboardType="default"
          errorMessage={errors.email?.message}
          staticHolder="Email"
          isSecureTextEntry={false}
          setIsSecureEntry={setIsSecureEntry}
        />
        <ErrorMessage message={errors.email?.message} />
        <InputField
          control={control}
          name="password"
          label="password"
          keyboardType="default"
          errorMessage={errors.password?.message}
          staticHolder="Password"
          isSecureTextEntry={isSecureTextEntry}
          setIsSecureEntry={setIsSecureEntry}
        />
        <ErrorMessage message={errors.password?.message} />
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
