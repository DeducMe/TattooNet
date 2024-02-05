// Header.tsx
import React from 'react';
import {Pressable, Text} from 'react-native';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export function Header({
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

const makeStyles = makeStyleSheet(theme => ({
  firstHeadereContainer: {
    marginStart: 30,
    marginTop: 80,
  },
  textHeader: {
    fontSize: 50,
    fontWeight: '600',
  },
}));
