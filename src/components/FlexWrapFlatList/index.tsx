import {ScrollView, FlatList} from 'react-native';
import React from 'react';
import ListItem from './ListItem';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export default function FlexWrapFlatList({
  data,
  onPress,
}: {
  data: {
    image: string;
  }[];
  onPress: () => void;
}) {
  const styles = makeStyles();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      <FlatList
        scrollEnabled={false}
        style={styles.flatList}
        numColumns={10}
        data={Array.from({length: 20})}
        horizontal={false}
        renderItem={({item, index}) => {
          return <ListItem onPress={onPress} />;
        }}
        showsHorizontalScrollIndicator={false}></FlatList>
    </ScrollView>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flatList: {
    paddingHorizontal: theme.space.s,
    height: 300 + theme.space.xs * 2,
  },
}));
