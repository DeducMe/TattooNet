import {View, Text, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import useTheme from 'common/theme';
import IconComponent from 'components/Basic/IconComponent';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

function CurrenctItem({id, title, selected, onPress, selectedId}: any) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchableContainer}>
      <Text style={styles.mainText}>{title}</Text>
      {selected && (
        <IconComponent
          iconSet="Ionicons"
          name={'arrow-back'}
          color={theme.colors.BLACK}
          size={25}
        />
      )}
    </TouchableOpacity>
  );
}

const makeStyles = (theme: any) =>
  StyleSheet.create({
    mainText: {
      color: theme.colors.BLACK,
      fontSize: 16,
      fontWeight: '600',
    },
    touchableContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderBottomColor: theme.colors.DEFAULT,
      borderBottomWidth: 1,
    },
  });

export default memo(CurrenctItem);
