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
}

const ActionButton: React.FC<IActionButtonProps> = ({
  onPress,
  textColor,
  title,
  style,
  textStyle,
  loading,
}) => {
  const styles = makeStyles();
  return (
    <PressableStyled
      disabled={loading}
      style={[styles.container, style]}
      onPress={onPress}>
      {!loading ? (
        <CustomText style={[styles.textStyle, {color: textColor}, textStyle]}>
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
}));

export {ActionButton};
