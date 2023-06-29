import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import CustomText from 'components/CustomText';
import StarBlock from 'components/StarBlock';
import {AppContext} from 'providers/AppProvider';
import LoadingView from 'components/Basic/LoadingView';

export default function FloatingInfo({master}: {master: boolean}) {
  const styles = makeStyles();
  const context = useContext(AppContext);
  const loading = master ? context.master.loading : context.master.loading;
  const data = master ? context.master.myTattoos : context.master.tattoos;
  return (
    <View style={styles.floatingInfo}>
      <View style={styles.floatingInfoItem}>
        <LoadingView loading={loading.tattoos} style={styles.floatingInfoItem}>
          <CustomText bold>{data?.portfolio?.length}</CustomText>
        </LoadingView>
        <CustomText style={styles.floatingInfoItemBottomText}>
          finished tattoos
        </CustomText>
      </View>
      <LoadingView
        size="large"
        loading={loading.tattoos}
        style={styles.floatingInfoItemRating}>
        <CustomText bold h1>
          4.5
        </CustomText>
        <StarBlock rating={4.5} noNumber imageSize={20} />
      </LoadingView>
      <View style={styles.floatingInfoItem}>
        <LoadingView loading={loading.tattoos} style={styles.floatingInfoItem}>
          <CustomText bold>{data?.available?.length}</CustomText>
        </LoadingView>
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
