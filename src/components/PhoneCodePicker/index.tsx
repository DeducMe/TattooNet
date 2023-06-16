import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useTheme from 'hooks/useTheme';
import RNPhoneCodeSelect from 'react-native-phone-code-select';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

const PhoneCodePicker: React.FC<IPhoneCodePickerProps> = ({
  visible,
  onDismiss,
  onChooseCountry,
}) => {
  const theme = useTheme();
  const styles = makeStyles();
  return (
    <RNPhoneCodeSelect
      visible={visible}
      onDismiss={onDismiss}
      sortFunction={(a: any, b: any) => {
        switch (a.code) {
          case 'UK':
            return -1;
          case 'GB':
            return -1;

          default:
            return 0;
        }
      }}
      onCountryPress={(country: any) => {
        onChooseCountry(country.dial_code);
      }}
      primaryColor={theme.colors.primary}
      secondaryColor="#000000"
      buttonText="Ok"
      backgroundColor={theme.colors.background}
      textColor={theme.colors.textColor}
    />
  );
};

const makeStyles = makeStyleSheet(theme => ({
  container: {},
}));
export interface IPhoneCodePickerProps {
  visible: boolean;
  onDismiss: () => void;
  onChooseCountry: (countryCode: string) => void;
}
export default PhoneCodePicker;
