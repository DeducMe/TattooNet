import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import useTheme from 'hooks/useTheme';

export default function Separator({style}: {style?: StyleProp<ViewStyle>}) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return <View style={[styles.separatorView, style]}></View>;
}

const makeStyles = (theme: any) =>
  StyleSheet.create({
    separatorView: {
      height: 1,
      width: '100%',
      backgroundColor: '#000',
    },
  });
