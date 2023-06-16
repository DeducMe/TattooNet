import React, {Component} from 'react';
import {
  Image,
  ImageProps,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';
import gravatarApi from 'gravatar-api';
import {ImagePropsBase} from 'react-native';

export default function Gravatar({style, sourceUri, options}: GravatarProps) {
  return (
    <Image
      style={[{width: 50, height: 50}, style]}
      source={{uri: sourceUri || gravatarApi.imageUrl(options)}}
    />
  );
}

export interface GravatarProps {
  style?: ViewStyle | TextStyle | ImageStyle;
  options?: any;
  sourceUri?: string;
}
