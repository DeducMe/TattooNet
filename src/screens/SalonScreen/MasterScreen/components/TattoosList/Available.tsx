import React, {useContext} from 'react';
import TwoColumnFlatList from 'components/TwoColumnFlatList';
import {ActionButton} from 'components/ActionButton';
import useTheme from 'hooks/useTheme';
import {AppContext} from 'providers/AppProvider';
import {useNavigation} from '@react-navigation/native';
import CustomText from 'components/CustomText';
import {ActivityIndicator} from 'react-native';

export default function Available({
  route: {
    params: {editable},
  },
}: {
  route: {params: {editable: boolean}};
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const context = useContext(AppContext);
  const data = editable
    ? context.master.myTattoos?.available
    : context.master.tattoos?.available;
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
        editable={editable}
        available={true}
      />
    </>
  );
}
