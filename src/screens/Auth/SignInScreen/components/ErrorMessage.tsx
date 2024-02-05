// ErrorMessage.tsx
import React from 'react';
import {View, Text} from 'react-native';
import useTheme from 'hooks/useTheme';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export function ErrorMessage({message}: {message: string}) {
  const theme = useTheme();
  const styles = makeStyles();

  return (
    <View style={styles.errorView}>
      <Text
        style={{
          color: theme.colors.error,
          paddingBottom: 5,
          alignContent: 'flex-start',
        }}>
        {message}
      </Text>
    </View>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  errorView: {
    alignSelf: 'flex-start',
    height: 25,
  },
}));
