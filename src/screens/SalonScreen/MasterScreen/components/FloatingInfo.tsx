import {View, Text} from 'react-native';
import React from 'react';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import CustomText from 'components/CustomText';
import StarBlock from 'components/StarBlock';

export default function FloatingInfo() {
  const styles = makeStyles();
  return (
    <View style={styles.floatingInfo}>
      <View style={styles.floatingInfoItem}>
        <CustomText bold>15</CustomText>
        <CustomText style={styles.floatingInfoItemBottomText}>
          finished tattoos
        </CustomText>
      </View>
      <View style={styles.floatingInfoItemRating}>
        <CustomText bold h1>
          4.5
        </CustomText>
        <StarBlock rating={4.5} noNumber imageSize={20} />
      </View>
      <View style={styles.floatingInfoItem}>
        <CustomText bold>100</CustomText>
        <CustomText style={styles.floatingInfoItemBottomText}>
          available tattoos
        </CustomText>
      </View>
    </View>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  floatingInfo: {
    width: '85%',
    alignSelf: 'center',
    padding: theme.space.s,
    borderRadius: theme.space.s,
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.space.s,

    ...theme.defaultShadow,
  },
  floatingInfoItem: {
    alignItems: 'center',
    width: '24%',
  },
  floatingInfoItemRating: {
    alignItems: 'center',
    width: '50%',
  },

  floatingInfoItemBottomText: {
    textAlign: 'center',
  },
}));
