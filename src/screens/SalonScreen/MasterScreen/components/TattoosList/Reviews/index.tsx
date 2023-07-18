import {View, Text, FlatList} from 'react-native';
import React, {useContext, useMemo} from 'react';
import ReviewsBlock from './ReviewsBlock';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {AppContext} from 'providers/AppProvider';
import CustomText from 'components/CustomText';

function Reviews({master}: {master: boolean}) {
  const styles = makeStyles();
  const context = useContext(AppContext);

  const data = useMemo(
    () => (master ? context.master.myReviews : context.master.reviews),
    [context.master.loading.reviews],
  );

  return (
    <FlatList
      ListEmptyComponent={
        <CustomText style={{textAlign: 'center'}}>No reviews yet...</CustomText>
      }
      style={styles.flatList}
      data={data}
      keyExtractor={item => item._id}
      renderItem={({item, index}) => {
        return (
          <ReviewsBlock
            images={item.images}
            name={item.userProfileId?.name}
            reviewText={item.text}
            rating={item.rating}
            date={new Date(item.updatedAt)}
          />
        );
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

export default React.memo(Reviews);
