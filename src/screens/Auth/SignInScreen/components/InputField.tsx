// InputField.tsx
import React from 'react';
import {View, Pressable} from 'react-native';
import ControlledTextInput from 'components/Basic/ControlledInputText';
import IconComponent from 'components/Basic/IconComponent';
import useTheme from 'hooks/useTheme';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export function InputField({
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

const makeStyles = makeStyleSheet(theme => ({
  inputContainer: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingStart: 8,
    borderBottomColor: theme.colors.backgroundDarker,
  },
}));
