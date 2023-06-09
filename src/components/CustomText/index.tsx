import React from 'react';
import { TextProps, Text } from 'react-native';
import { makeStyleSheet } from 'theme/makeStyleSheet';

export default function CustomText({
  children,
  ...textProps
}: ICustomTextProps) {
  const styles = makeStyles();

  return (
    <Text {...textProps} style={[styles.text, textProps.style]}>
      {children}
    </Text>
  );
}
const makeStyles = makeStyleSheet((theme) => ({
  text: {
    color: theme.colors.textColor,
  },
}));
export interface ICustomTextProps extends TextProps {}
