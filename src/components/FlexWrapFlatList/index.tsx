import {ScrollView, FlatList} from 'react-native';
import React from 'react';
import ListItem from './ListItem';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

function FlexWrapFlatList({
  data,
  onPress,
}: {
  data: {
    images: string;
  }[];
  onPress: (item: {images: string}) => void;
}) {
  const styles = makeStyles();
  return (
    <FlatList
      scrollEnabled={false}
      style={styles.flatList}
      numColumns={data.length / 2}
      data={data}
      horizontal={false}
      renderItem={({item, index}) => {
        return (
          <ListItem image={item.images[0]} onPress={() => onPress(item)} />
        );
      }}
      showsHorizontalScrollIndicator={false}></FlatList>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flatList: {
    justifyContent: 'space-between',
    paddingHorizontal: theme.space.s,
    height: 300,
  },
}));

export default React.memo(FlexWrapFlatList);
