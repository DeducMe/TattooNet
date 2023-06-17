import React, {useContext} from 'react';
import TwoColumnFlatList from 'components/TwoColumnFlatList';
import {ActionButton} from 'components/ActionButton';
import useTheme from 'hooks/useTheme';
import {AppContext} from 'providers/AppProvider';

export default function Available({
  route: {
    params: {editable},
  },
}: {
  route: {params: {editable: boolean}};
}) {
  const theme = useTheme();
  const context = useContext(AppContext);
  return (
    <>
      {!!editable && (
        <ActionButton
          style={{
            marginHorizontal: theme.space.s,
            marginVertical: theme.space.xs,
          }}
          roundButton
          title="Add new available tattoo"></ActionButton>
      )}

      <TwoColumnFlatList
        data={context.master.tattoos.portfolio}
        editable={editable}
      />
    </>
  );
}
