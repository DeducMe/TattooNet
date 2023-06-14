import {View, Text, Pressable} from 'react-native';
import React from 'react';
import useTheme from 'hooks/useTheme';
import FastImage from 'react-native-fast-image';
import PressableStyled from 'components/PressableStyled';

export default function ListItem({onPress}: {onPress?: () => void}) {
  const theme = useTheme();

  let width = Math.round(300 * Math.random() * 2);
  if (width < 150) width = 150;
  if (width > 450) width = 450;
  return (
    <PressableStyled
      onPress={onPress}
      style={{
        marginTop: theme.space.xs,
        borderRadius: theme.space.s,
        ...theme.defaultShadow,
        overflow: 'hidden',
        backgroundColor: theme.colors.background,
        height: 150,
        width,
        marginRight: theme.space.s,
      }}>
      <FastImage
        style={{height: 150, width}}
        source={{
          uri: `https://picsum.photos/${width}/150`,
        }}
      />
    </PressableStyled>
  );
}
