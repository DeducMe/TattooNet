import React from 'react';
import TwoColumnFlatList from 'components/TwoColumnFlatList';
import {ActionButton} from 'components/ActionButton';
import useTheme from 'hooks/useTheme';
import {useNavigation} from '@react-navigation/native';

export default function Portfolio({
  route: {
    params: {editable},
  },
}: {
  route: {params: {editable: boolean}};
}) {
  const theme = useTheme();
  const navigation = useNavigation();
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
      <TwoColumnFlatList marginTabBar editable={editable} />
    </>
  );
}
