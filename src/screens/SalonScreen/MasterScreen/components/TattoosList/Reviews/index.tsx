import {View, Text, FlatList} from 'react-native';
import React from 'react';
import ReviewsBlock from './ReviewsBlock';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export default function Reviews() {
  const styles = makeStyles();
  return (
    <FlatList
      style={styles.flatList}
      data={Array.from({length: 20})}
      renderItem={({item, index}) => {
        return <ReviewsBlock />;
      }}></FlatList>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flatList: {
    paddingTop: theme.space.s,
    paddingHorizontal: theme.space.s,
  },
}));
