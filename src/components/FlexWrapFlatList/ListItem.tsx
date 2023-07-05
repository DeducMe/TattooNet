import {View, Text, Pressable} from 'react-native';
import React from 'react';
import useTheme from 'hooks/useTheme';
import FastImage from 'react-native-fast-image';
import PressableStyled from 'components/PressableStyled';

export default function ListItem({
  onPress,
  image,
}: {
  onPress?: () => void;
  image: string;
}) {
  const theme = useTheme();

  let width = Math.round(300 * Math.random() * 2);
  if (width < 150) width = 150;
  if (width > 450) width = 450;

  console.log(image);
  return (
    <PressableStyled
      onPress={onPress}
      style={{
        borderRadius: theme.space.s,
        ...theme.defaultShadow,
        overflow: 'hidden',
        backgroundColor: theme.colors.background,
        height: 145,
        width,
        marginRight: theme.space.s,
      }}>
      <FastImage
        style={{height: 145, width}}
        source={{
          uri: image,
        }}
      />
    </PressableStyled>
  );
}
