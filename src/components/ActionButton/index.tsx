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
  return (
    <View style={[styles.container, style]}>
      <TouchableNativeFeedback onPress={onPress}>
        <CustomText style={[styles.textStyle, { color: textColor }, textStyle]}>
          {title}
        </CustomText>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 4, overflow: 'hidden' },
  textStyle: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontWeight: 'bold',
  },
});

export { ActionButton };
