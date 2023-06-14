import React from 'react';
import {TextProps, Text} from 'react-native';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import useTheme from 'hooks/useTheme';

export default function CustomText({
  children,
  h1,
  h2,
  sub,
  bold,
  grayed,
  centered,
  style,
  ...textProps
}: ICustomTextProps) {
  const theme = useTheme();
  const styles = makeStyles();

  return (
    <Text
      style={[
        {...textProps},
        styles.text,
        {
          fontSize: h1
            ? theme.fontSizes.h3.md
            : h2
            ? theme.fontSizes.large
            : theme.fontSizes.medium,
          fontWeight: bold ? theme.fontWeights.bold : theme.fontWeights.normal,
          textAlign: centered ? 'center' : 'left',
        },
        style,
      ]}>
      {children}
    </Text>
  );
}
const makeStyles = makeStyleSheet(theme => ({
  text: {
    color: theme.colors.textColor,
  },
}));
export interface ICustomTextProps extends TextProps {
  h1?: boolean;
  h2?: boolean;
  sub?: boolean;
  bold?: boolean;
  grayed?: boolean;
  centered?: boolean;
}
