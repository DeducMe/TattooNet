import {View, Text, FlatList, Platform} from 'react-native';
import React, {useContext, useMemo} from 'react';
import {AppContext} from 'providers/AppProvider';
import MasterAroundSkeleton from 'components/Skeletons/Map/MasterAroundSkeleton';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import MasterBlock from 'components/MasterBlock';
import MasterBlockSmall from 'components/MasterBlockSmall';
import useTheme from 'hooks/useTheme';

export default function MasterAround({
  setChosenItem,
}: {
  setChosenItem: (number: number) => void;
}) {
  const context = useContext(AppContext);
  const theme = useTheme();
  const ITEM_SIZE = useMemo(() => 230, []);

  if (context.feed.loading) return <MasterAroundSkeleton />;

  return (
    <FlatList
      style={{width: '100%'}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={context.feed.feed}
      onMomentumScrollEnd={(e: any) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        setChosenItem(Math.round(offsetX / ITEM_SIZE));
      }}
      renderItem={({item}) => {
        return (
          <>
            <MasterBlockSmall master={item.master} />
          </>
        );
      }}></FlatList>
  );
}
