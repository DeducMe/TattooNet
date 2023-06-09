import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import useTheme from 'common/theme';

export default function Separator() {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return <View style={styles.separatorView}></View>;
}

const makeStyles = (theme: any) =>
  StyleSheet.create({
    separatorView: {
      height: 1,
      width: '100%',
      backgroundColor: 'black',
    },
  });
