import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gravatar} from 'react-native-gravatar';
import CustomText from 'components/CustomText';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export default function ProfileScreen() {
  const stlyes = makeStyles();
  return (
    <SafeAreaView>
      <CustomText>Currenlty in development</CustomText>
    </SafeAreaView>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  userInfo: {
    width: theme.dimensions.width * 0.3,
    marginLeft: theme.space.l,
    marginRight: theme.dimensions.width * 0.15,
  },
}));
