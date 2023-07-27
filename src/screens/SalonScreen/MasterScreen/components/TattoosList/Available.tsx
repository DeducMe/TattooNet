import React, {useContext, useMemo} from 'react';
import TwoColumnFlatList from 'components/TwoColumnFlatList';
import {ActionButton} from 'components/ActionButton';
import useTheme from 'hooks/useTheme';
import {AppContext} from 'providers/AppProvider';
import {useNavigation} from '@react-navigation/native';
import CustomText from 'components/CustomText';
import {ActivityIndicator} from 'react-native';
import LoadingView from 'components/Basic/LoadingView';

function Available({
  route: {
    params: {editable},
  },
}: {
  route: {params: {editable: boolean}};
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const context = useContext(AppContext);
  const data = useMemo(
    () =>
      editable
        ? context.tattoos.myTattoos.available
        : context.tattoos.tattoos.available,
    [context.tattoos.myTattoos.available, context.tattoos.tattoos.available],
  );
  const loading = useMemo(
    () => context.tattoos.loading.tattoos,
    [context.tattoos.loading.tattoos],
  );

  if (loading)
    return (
      <ActivityIndicator style={{marginTop: theme.space.s}} size={'large'} />
    );
  return (
    <>
      {!!editable && (
        <ActionButton
          onPress={() =>
            navigation.navigate('AddTattoo', {
              type: 'available',
            })
          }
          style={{
            marginHorizontal: theme.space.s,
            marginVertical: theme.space.xs,
          }}
          roundButton
          title="Add new available tattoo"></ActionButton>
      )}

      <TwoColumnFlatList
        ListEmptyComponent={
          <CustomText style={{textAlign: 'center'}}>
            No available tattoos yet...
          </CustomText>
        }
        data={data}
        marginTabBar
        editable={editable}
        available={true}
      />
    </>
  );
}

export default React.memo(Available);
