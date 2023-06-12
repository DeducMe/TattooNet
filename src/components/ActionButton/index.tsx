import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import CustomText from 'components/CustomText';
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
} from 'react-native';
// import {  } from 'react-native-gesture-handler';

export interface IActionButtonProps extends TouchableNativeFeedbackProps {
  textColor?: ColorValue;
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  onPress,
  textColor,
  title,
  style,
  textStyle,
}) => {
  const styles = makeStyles();
  return (
    <View style={[styles.container, style]}>
      <TouchableNativeFeedback onPress={onPress}>
        <CustomText style={[styles.textStyle, {color: textColor}, textStyle]}>
          {title}
        </CustomText>
      </TouchableNativeFeedback>
    </View>
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
