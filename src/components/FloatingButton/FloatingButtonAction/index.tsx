import React from 'react';
import {View} from 'react-native';
import CustomText from 'components/CustomText';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

const FloatingButtonAction: React.FC<IFloatingButtonActionProps> = ({
  icon,
  text,
}) => {
  const styles = makeStyle();
  return (
    <View key={Math.random() + ''} style={styles.container}>
      <View style={styles.textContainer}>
        <CustomText style={styles.text}>{text}</CustomText>
      </View>
      <View style={styles.iconContainer}>{icon}</View>
    </View>
  );
};

const makeStyle = makeStyleSheet(theme => ({
  container: {
    marginRight: -1 * theme.space.xxs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    padding: theme.space.xs,
    color: '#ffffff',
    textAlign: 'center',
  },
  textContainer: {
    backgroundColor: theme.colors.primary,
    minWidth: 120,
    paddingHorizontal: theme.space.xxs,
    paddingVertical: theme.space.xxxs,
    marginRight: theme.space.m,
    borderRadius: 10,
    ...theme.defaultShadow,
  },
  iconContainer: {
    backgroundColor: theme.colors.primary,
    padding: 13,
    borderRadius: 50,
    ...theme.defaultShadow,
  },
}));

export interface IFloatingButtonActionProps {
  icon: JSX.Element;
  text: string;
}
export default FloatingButtonAction;
