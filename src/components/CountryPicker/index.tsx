import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useContext,
} from 'react';
import {Animated, Easing, Platform, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import useTheme from 'hooks/useTheme';
import {MainContext} from 'providers/MainProvider';

const CountryPicker = forwardRef<ICountryPickerRef, ICountryPickerProps>(
  (
    {
      dialCode,
      selectedCountry,
      setSelectedCountry,
      setSelectedCountryFlag,
      setValue,
    },
    ref,
  ) => {
    const theme = useTheme();
    const context = useContext(MainContext);
    const countries = context.country.country;

    function getCountryEmoji(dialCode: string) {
      const foundEmoji = countries.find(
        country => country.dial_code === '+' + dialCode,
      );
      if (foundEmoji) {
        return foundEmoji.emoji;
      } else return '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
    }

    return (
      <View style={{height: Platform.OS === 'ios' ? 220 : 50}}>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={itemValue => {
            setSelectedCountry && setSelectedCountry(itemValue);
            setSelectedCountryFlag?.(getCountryEmoji(itemValue.slice(1)));
            setValue?.('country_code', itemValue);
          }}>
          {countries.map((item, key) => (
            <Picker.Item
              color={theme.colors.textColor}
              key={key}
              label={`${item.emoji}  ${item.name}`}
              value={!dialCode ? `${item.name}` : `${item.dial_code}`}
            />
          ))}
        </Picker>
      </View>
    );
  },
);
export interface ICountryPickerRef {
  toggleCountry: () => void;
}

export interface ICountryPickerProps {
  dialCode: boolean;
  selectedCountry: string;
  setSelectedCountry?: (value: string) => void;
  setSelectedCountryFlag?: (value: string) => void;
  setValue?: (key: string, value: any) => void;
}

export default CountryPicker;
