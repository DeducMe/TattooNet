import React from 'react';
import {ActivityIndicator, View, ViewProps} from 'react-native';

export default function LoadingView({
  children,
  loading,
  style,
  size = 'small',
  ...textProps
}: ILoadingViewProps) {
  return (
    <View {...textProps} style={style}>
      {loading ? <ActivityIndicator size={size} /> : children}
    </View>
  );
}

export interface ILoadingViewProps extends ViewProps {
  loading: boolean;
  size?: 'large' | 'small';
}
