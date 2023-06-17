import React from 'react';
import {FloatingAction, IActionProps} from 'react-native-floating-action';
import useTheme from 'hooks/useTheme';

const FloatingButton: React.FC<IFloatingButtonProps> = ({
  actions = [],
  onPressItem,
}) => {
  const theme = useTheme();

  return (
    <FloatingAction
      iconWidth={25}
      iconHeight={25}
      showBackground
      distanceToEdge={{
        vertical: theme.common.tabNavigationHeight + theme.space.m,
        horizontal: 15,
      }}
      color={theme.colors.primary}
      actions={actions}
      actionsPaddingTopBottom={theme.space.xxxs}
      onPressItem={onPressItem}
    />
  );
};

// const makeStyle = makeStyleSheet((theme) => ({}));
export interface IFloatingButtonProps {
  actions?: IActionProps[];
  onPressItem: (name?: string) => void;
}
export default FloatingButton;
