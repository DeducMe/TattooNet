import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';

export default function PressableStyled({
  children,
  containerStyle,
  ...props
}: PressableStyledProps) {
  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View
        style={[
          {
            opacity: animated,
          },
          containerStyle,
        ]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

export interface PressableStyledProps extends PressableProps {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}
