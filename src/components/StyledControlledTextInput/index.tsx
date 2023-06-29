import {View, Text, StyleProp, TextStyle, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import ControlledTextInput, {
  IControlledTextInputProps,
} from 'components/Basic/ControlledInputText';
import useTheme from 'hooks/useTheme';
import CustomText from 'components/CustomText';

export default function StyledControlledTextInput({
  hideTitle,
  titleStyle,
  containerStyle,
  renderHelper,
  ...props
}: StyledControlledTextInputProps) {
  const theme = useTheme();
  return (
    <View style={[{width: '100%'}, containerStyle]}>
      {!hideTitle && (
        <CustomText
          style={[
            {
              alignSelf: 'flex-start',
              textAlign: 'left',
              marginBottom: theme.space.xxxs,
            },
            titleStyle,
          ]}>
          {props.label}
        </CustomText>
      )}
      <ControlledTextInput
        {...props}
        disabledButton
        renderHelper={renderHelper}
        inputStyle={[
          {
            paddingVertical: theme.space.xs,
            borderWidth: 1,
            borderRadius: theme.space.xs,
            paddingHorizontal: theme.space.s,
          },
          props.inputStyle,
        ]}
      />
    </View>
  );
}

export interface StyledControlledTextInputProps
  extends IControlledTextInputProps {
  hideTitle?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  renderHelper?: (textInput: string) => ReactNode;
}
