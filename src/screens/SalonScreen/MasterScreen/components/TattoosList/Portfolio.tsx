import React, {useContext, useMemo} from 'react';
import TwoColumnFlatList from 'components/TwoColumnFlatList';
import {ActionButton} from 'components/ActionButton';
import useTheme from 'hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from 'providers/AppProvider';
import CustomText from 'components/CustomText';
import {ActivityIndicator} from 'react-native';

function Portfolio({
  route: {
    params: {editable},
  },
}: {
  route: {params: {editable: boolean}};
}) {
  const theme = useTheme();
  const navigation = useNavigation();
  const context = useContext(AppContext);

  const data = useMemo(
    () =>
      editable
        ? context.tattoos.myTattoos.portfolio
        : context.tattoos.tattoos.portfolio,
    [context.tattoos.myTattoos.portfolio, context.tattoos.tattoos.portfolio],
  );
  const loading = useMemo(
    () => context.tattoos.loading.tattoos,
    [context.tattoos.loading.tattoos],
  );

  console.log(loading);

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
              type: 'completed',
            })
          }
          style={{
            marginHorizontal: theme.space.s,
            marginVertical: theme.space.xs,
          }}
          roundButton
          title="Add completed tattoo"></ActionButton>
      )}
      <TwoColumnFlatList
        ListEmptyComponent={
          <CustomText style={{textAlign: 'center'}}>
            No completed tattoos yet...
          </CustomText>
        }
        data={data}
        marginTabBar
        editable={editable}
        available={false}
      />
    </>
  );
}

export default React.memo(Portfolio);
