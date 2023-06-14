import {View, Text, Image, Linking} from 'react-native';
import React from 'react';
import PressableStyled from 'components/PressableStyled';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export type SocialButtonsProps = {
  data: {
    type: string;
    link: string;
  }[];
};
export default function SocialButtons({data}: SocialButtonsProps) {
  const styles = makeStyles();

  const getImages = (type: string) => {
    switch (type) {
      case 'twitter':
        return require('assets/twitter.png');
      case 'vk':
        return require('assets/vk.png');
      case 'tik-tok':
        return require('assets/tik-tok.png');
      case 'facebook':
        return require('assets/facebook.png');
      case 'instagram':
        return require('assets/instagram.png');

      default:
        return null;
    }
  };

  const getOnPress = (type: string, link: string) => {
    switch (type) {
      case 'twitter':
        return () => Linking.openURL(link || 'twitter.com');

      default:
        return () => {};
    }
  };
  return (
    <PressableStyled containerStyle={{flexDirection: 'row'}}>
      {data.map(item => (
        <PressableStyled
          onPress={getOnPress(item.type, item.link)}
          style={styles.socialButtonContainer}>
          <Image source={getImages(item.type)}></Image>
        </PressableStyled>
      ))}
    </PressableStyled>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  socialButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.space.m,
    marginHorizontal: theme.space.m,
    marginTop: theme.space.xs,
    height: 50,
    width: 50,
  },
  socialButton: {
    height: 50,
    width: 50,
  },
}));
