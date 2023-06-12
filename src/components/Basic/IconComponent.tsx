import useTheme from 'hooks/useTheme';
import {IconPack, getIcon} from '../../common/getIcon';
import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {StyleProp} from 'react-native';

// TODO Это хороший компонент, назван правильно, в правильной папке

type Props = {
  name: string;
  color: string;
  size: number;
  iconSet: IconPack;
  style?: StyleProp<ViewStyle>;
};

const IconComponent = ({
  name,
  color,
  size,
  iconSet = 'MaterialIcons',
  style,
}: Props) => {
  const styles = makeStyles();

  const IconSet = getIcon(iconSet);
  return (
    <View style={[styles.iconContainer, style]}>
      <IconSet name={name} color={color} size={size} />
    </View>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default IconComponent;
