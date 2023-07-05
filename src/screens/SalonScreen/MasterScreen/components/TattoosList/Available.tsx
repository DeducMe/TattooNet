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
        ? context.master.myTattoos.available
        : context.master.tattoos.available,
    [context.master.myTattoos.available, context.master.tattoos.available],
  );
  const loading = useMemo(
    () => context.master.loading.tattoos,
    [context.master.loading.tattoos],
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

      <LoadingView loading={loading}>
        <TwoColumnFlatList
          ListEmptyComponent={
            <CustomText style={{textAlign: 'center'}}>
              No available tattoos yet...
            </CustomText>
          }
          data={data}
          editable={editable}
          available={true}
        />
      </LoadingView>
    </>
  );
}

export default React.memo(Available);
