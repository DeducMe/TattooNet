import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import IconComponent from 'components/Basic/IconComponent';
import CustomText from 'components/CustomText';
import PressableStyled from 'components/PressableStyled';
import React from 'react';
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
// import {  } from 'react-native-gesture-handler';

export interface IRowButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  onPress?: () => void;
  Icon?: JSX.Element;
}

const RowButton: React.FC<IRowButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  loading,
  Icon,
}) => {
  const styles = makeStyles();
  return (
    <PressableStyled
      disabled={loading}
      style={[styles.container, style]}
      onPress={onPress}>
      {!loading ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            {!!Icon && Icon}

            <CustomText style={[styles.textStyle, textStyle]}>
              {title}
            </CustomText>
          </View>
          <IconComponent
            iconSet="MaterialIcons"
            name={'arrow-forward-ios'}
            size={16}
          />
        </View>
      ) : (
        <ActivityIndicator style={{alignSelf: 'center'}} />
      )}
    </PressableStyled>
  );
};

const makeStyles = makeStyleSheet(theme => ({
  container: {
    borderRadius: theme.space.xs,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: theme.space.xs,
    paddingHorizontal: theme.space.s,
    paddingVertical: theme.space.xs,
  },
  textStyle: {
    alignSelf: 'center',
    paddingVertical: theme.space.xxs,
    fontWeight: theme.fontWeights.bold,
  },
  roundButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.space.xs,
    // width: '100%',
    borderRadius: theme.space.xs,
    ...theme.defaultShadow,
  },
}));

export {RowButton};
