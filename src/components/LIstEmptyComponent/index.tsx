import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { EmtyComponentBlock } from './EmtyComponentBlock';
import useTheme from 'hooks/useTheme';
import { EmptyComponentMessageBlock } from './EmptyComponentMessageBlock';

export const ListEmptyComponent: React.FC<IListEmptyComponentProps> = ({
  title,
  onPress,
  buttonTitle,
  description,
  customDescription,
}) => {
  const theme = useTheme();

  return (
    <>
      <View style={{ paddingVertical: theme.space.m }}>
        <EmtyComponentBlock grayed />
        <EmtyComponentBlock />
        <EmtyComponentBlock grayed />
      </View>
      <EmptyComponentMessageBlock
        buttonTitle={buttonTitle}
        onPress={onPress}
        title={title}
        description={description}
        customDescription={customDescription}></EmptyComponentMessageBlock>
    </>
  );
};

export interface IListEmptyComponentProps {
  title: string;
  description?: string;

  onPress?: () => void;
  buttonTitle?: string;
  customDescription?: any;
}
