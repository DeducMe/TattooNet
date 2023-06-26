import React, {useContext} from 'react';
import TwoColumnFlatList from 'components/TwoColumnFlatList';
import {ActionButton} from 'components/ActionButton';
import useTheme from 'hooks/useTheme';
import {AppContext} from 'providers/AppProvider';
import {useNavigation} from '@react-navigation/native';

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

  console.log(context.master.myTattoos);
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

      <TwoColumnFlatList data={data} editable={editable} available={true} />
    </>
  );
}
