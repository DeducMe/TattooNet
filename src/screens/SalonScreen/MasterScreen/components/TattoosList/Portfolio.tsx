import React, {useContext} from 'react';
import TwoColumnFlatList from 'components/TwoColumnFlatList';
import {ActionButton} from 'components/ActionButton';
import useTheme from 'hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from 'providers/AppProvider';
import CustomText from 'components/CustomText';
import {ActivityIndicator} from 'react-native';

export default function Portfolio({
  route: {
    params: {editable},
  },
}: {
  route: {params: {editable: boolean}};
}) {
  const theme = useTheme();
  const navigation = useNavigation();
  const context = useContext(AppContext);

  const data = editable
    ? context.master.myTattoos?.portfolio
    : context.master.tattoos?.portfolio;

  const loading = editable
    ? context.master.loading.myTattoos
    : context.master.loading.tattoos;

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
            No available tattoos yet...
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
