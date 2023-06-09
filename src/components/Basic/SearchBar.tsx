import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import useTheme from '../../common/theme';

export default function SearchBar({
  value,
  onChangeText,
  placeholder,
  styles,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  styles: any;
}) {
  const theme = useTheme();
  return (
    <TextInput
      style={styles}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

const makeStyles = (theme: any) => StyleSheet.create({});
