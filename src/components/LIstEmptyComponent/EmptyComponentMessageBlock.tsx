import {StyleSheet, View} from 'react-native';
import React from 'react';
import useTheme from 'hooks/useTheme';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {ActionButton} from 'components/ActionButton';
import CustomText from 'components/CustomText';

export const EmptyComponentMessageBlock: React.FC<
  IEmptyComponentMessageBlockProps
> = ({title, description, buttonTitle, onPress, customDescription}) => {
  const styles = makeStyles();
  return (
    <View style={[styles.container]}>
      <View style={styles.textContainer}>
        <CustomText style={styles.mainEmptyTitle}>{title}</CustomText>
        {description && (
          <CustomText style={styles.description}>{description}</CustomText>
        )}
        {!!customDescription && customDescription}
      </View>
      {onPress && (
        <ActionButton
          style={styles.buttonStyle}
          onPress={onPress}
          title={buttonTitle}></ActionButton>
      )}
    </View>
  );
};

const makeStyles = makeStyleSheet(theme => ({
  container: {
    marginHorizontal: theme.space.s,
    paddingHorizontal: theme.space.s,

    borderRadius: theme.space.s,
    ...theme.defaultShadow,
    backgroundColor: theme.colors.background,
  },
  textContainer: {
    paddingVertical: theme.space.xxxl,
  },
  mainEmptyTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: theme.fontSizes.h1.md,
    marginBottom: theme.space.l,
  },
  description: {
    textAlign: 'center',
    color: 'gray',
  },
  buttonStyle: {
    marginBottom: theme.space.m,
  },
}));

export interface IEmptyComponentMessageBlockProps {
  title: string;
  description?: string;
  buttonTitle?: string;
  onPress?: () => void;
  customDescription: any;
}
