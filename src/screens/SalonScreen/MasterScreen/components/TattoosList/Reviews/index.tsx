import {View, Text, FlatList} from 'react-native';
import React, {useContext} from 'react';
import ReviewsBlock from './ReviewsBlock';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {AppContext} from 'providers/AppProvider';
import CustomText from 'components/CustomText';

export default function Reviews({master}: {master: boolean}) {
  const styles = makeStyles();
  const context = useContext(AppContext);

  const data = master ? context.master.myReviews : context.master.reviews;

  console.log(data, 'test');
  return (
    <FlatList
      ListEmptyComponent={
        <CustomText style={{textAlign: 'center'}}>No reviews yet...</CustomText>
      }
      style={styles.flatList}
      data={data}
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
