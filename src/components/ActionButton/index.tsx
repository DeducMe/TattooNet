import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import CustomText from 'components/CustomText';
import PressableStyled from 'components/PressableStyled';
import React from 'react';
import {
  ColorValue,
  StyleSheet,
  TouchableNativeFeedbackProps,
  View,
  TouchableNativeFeedback,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
// import {  } from 'react-native-gesture-handler';

export interface IActionButtonProps extends TouchableNativeFeedbackProps {
  textColor?: ColorValue;
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  roundButton?: boolean;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  onPress,
  textColor,
  title,
  style,
  textStyle,
  loading,
  roundButton,
}) => {
  const styles = makeStyles();
  return (
    <PressableStyled
      disabled={loading}
      style={[styles.container, roundButton && styles.roundButton, style]}
      onPress={onPress}>
      {!loading ? (
        <CustomText
          bold={roundButton}
          style={[
            styles.textStyle,
            {color: roundButton ? '#fff' : textColor},
            textStyle,
          ]}>
          {title}
        </CustomText>
      ) : (
        <ActivityIndicator style={{alignSelf: 'center'}} />
      )}
    </PressableStyled>
  );
};

const makeStyles = makeStyleSheet(theme => ({
  container: {borderRadius: theme.space.xxs, overflow: 'hidden'},
  textStyle: {
    alignSelf: 'center',
    paddingHorizontal: theme.space.s,
    paddingVertical: theme.space.xxs,
    fontWeight: theme.fontWeights.bold,
  },
  roundButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.space.xs,
    width: '100%',
    borderRadius: theme.space.xs,
    ...theme.defaultShadow,
  },
}));

export {ActionButton};
