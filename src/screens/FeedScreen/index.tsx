import {FlatList} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FeedSkeleton from 'components/Skeletons/Feed';
import {AppContext} from 'providers/AppProvider';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import FeedBlock from './FeedBlock';

export default function FeedScreen() {
  const context = useContext(AppContext);

  if (context.feed.loading || !context.feed.feed?.length)
    return <FeedSkeleton />;

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <CustomText style={{paddingHorizontal: theme.space.xs}} bold h2>
        Top masters
      </CustomText> */}
      <FlatList
        data={context.feed.feed}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => <FeedBlock item={item}></FeedBlock>}
      />
    </SafeAreaView>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  tagStyle: {
    flexDirection: 'row',
    marginRight: theme.space.xs,
    paddingVertical: theme.space.xxxs,
    backgroundColor: theme.colors.background,
  },
}));
