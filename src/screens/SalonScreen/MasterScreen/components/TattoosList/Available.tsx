import React from 'react';
import TwoColumnFlatList from 'components/TwoColumnFlatList';
import {ActionButton} from 'components/ActionButton';
import useTheme from 'hooks/useTheme';

export default function Available({
  route: {
    params: {editable},
  },
}: {
  route: {params: {editable: boolean}};
}) {
  const theme = useTheme();
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
      <TwoColumnFlatList editable={editable} />
    </>
  );
}
