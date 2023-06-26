import React, {useContext} from 'react';
import TwoColumnFlatList from 'components/TwoColumnFlatList';
import {ActionButton} from 'components/ActionButton';
import useTheme from 'hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from 'providers/AppProvider';

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
        data={data}
        marginTabBar
        editable={editable}
        available={false}
      />
    </>
  );
}
