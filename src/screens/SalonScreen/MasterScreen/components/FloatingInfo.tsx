import {View, Text} from 'react-native';
import React, {useContext, useMemo} from 'react';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import CustomText from 'components/CustomText';
import StarBlock from 'components/StarBlock';
import {AppContext} from 'providers/AppProvider';
import LoadingView from 'components/Basic/LoadingView';

function FloatingInfo({master}: {master: boolean}) {
  const styles = makeStyles();
  const context = useContext(AppContext);
  const loading = useMemo(
    () => context.tattoos.loading.tattoos || context.master.loading.master,
    [context.tattoos.loading.tattoos, context.master.loading.master],
  );
  const data = useMemo(
    () => (master ? context.tattoos.myTattoos : context.tattoos.tattoos),
    [master ? context.tattoos.myTattoos : context.tattoos.tattoos],
  );

  const profile = useMemo(
    () => (master ? context.myProfile.profile : context.master.master),
    [master ? context.myProfile.profile : context.master.master],
  );

  return (
    <View style={styles.floatingInfo}>
      <View style={styles.floatingInfoItem}>
        <LoadingView loading={loading}>
          <CustomText bold>{data?.portfolio?.length}</CustomText>
        </LoadingView>
        <CustomText style={styles.floatingInfoItemBottomText}>
          finished tattoos
        </CustomText>
      </View>
      <LoadingView
        size="large"
        loading={loading}
        style={styles.floatingInfoItemRating}>
        {!!profile?.rating && (
          <>
            <CustomText bold h1>
              {profile?.rating}
            </CustomText>
            <StarBlock rating={profile?.rating} noNumber imageSize={20} />
          </>
        )}
      </LoadingView>
      <View style={styles.floatingInfoItem}>
        <LoadingView loading={loading}>
          <CustomText numberOfLines={1} bold>
            {data?.available?.length}
          </CustomText>
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

export default React.memo(FloatingInfo);
