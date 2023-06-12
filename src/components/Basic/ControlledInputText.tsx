import {
  View,
  Text,
  TextInputProps,
  StyleProp,
  TextStyle,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';
import useTheme from 'hooks/useTheme';
import CustomText from 'components/CustomText';

const ControlledTextInput: React.FC<IControlledTextInputProps> = props => {
  const {
    control,
    errorMessage,
    name,
    label,
    defaultValue,
    staticHolder,
    inputStyle,
    showLabel,
    placeHolder = '',
    alwaysFocused = false,
    phone,
    setCountryCode,
    disabledButton,
    countryCode,
    ...inputProps
  } = props;
  const theme = useTheme();
  const styles = makeStyles(theme);
  const textIn = useRef<TextInput>(null); //declare ref

  useEffect(() => {
    if (alwaysFocused) {
      (
        textIn.current || {setNativeProps: (selection: any) => {}}
      ).setNativeProps({
        selection: {start: 0, end: 0},
      });
    }
  });

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({field: {onChange, onBlur, value}}) => (
          <TouchableOpacity
            disabled={disabledButton}
            onPress={() => textIn?.current?.focus()}
            style={[
              inputStyle,
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              },
            ]}>
            {showLabel && <CustomText style={styles.title}>{label}</CustomText>}
            <TextInput
              ref={textIn}
              style={{
                width: '100%',
                color: theme.colors.textColor,
              }}
              autoCapitalize="none"
              {...inputProps}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={theme.colors.contrast}
              placeholder={staticHolder}
            />
          </TouchableOpacity>
        )}
      />

      {!!errorMessage && (
        <CustomText style={styles.error}>{errorMessage}</CustomText>
      )}
    </>
  );
};

export interface IControlledTextInputProps extends TextInputProps {
  control: Control<FieldValues> | undefined;
  errorMessage: string;
  name: string;
  label: string;
  staticHolder: string;
  showLabel?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  placeHolder?: string;
  alwaysFocused?: boolean;
  phone?: boolean;
  disabledButton?: boolean;
  setCountryCode?: (text: string) => void;
  countryCode?: string;
}
export default ControlledTextInput;

const makeStyles = (theme: any) =>
  StyleSheet.create({
    input: {
      padding: 5 /*theme.space.s*/,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.backgroundDarker,
      color: theme.colors.text?.PLACEHOLDER,
      fontSize: theme.fontSizes.small,
      letterSpacing: 0.3,
    },
    title: {
      paddingRight: 5 /*theme.space.s*/,
      fontSize: theme.fontSizes.medium,
      fontWeight: '500',
      textAlignVertical: 'center',
      color: theme.colors.backgroundDarker,
    },
    error: {
      alignSelf: 'flex-start',
      marginVertical: 5 /*theme.space.xxs*/,
      color: theme.colors.ERROR,
    },
    separator: {
      width: 1,
      height: 40,
      backgroundColor: theme.colors.backgroundDarker,
      marginHorizontal: 5 /*{theme.space.s}*/,
    },
  });
