import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useContext, useMemo} from 'react';
import ReviewsBlock from './ReviewsBlock';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {AppContext} from 'providers/AppProvider';
import CustomText from 'components/CustomText';

function Reviews({
  route: {
    params: {master},
  },
}: {
  route: {params: {master: boolean}};
}) {
  const styles = makeStyles();
  const context = useContext(AppContext);

  const data = useMemo(
    () => (master ? context.reviews.myReviews : context.reviews.reviews),
    [context.reviews.loading.reviews],
  );

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        context.reviews.loading.reviews ? (
          <ActivityIndicator size={'large'}></ActivityIndicator>
        ) : (
          <CustomText style={{textAlign: 'center'}}>
            No reviews yet...
          </CustomText>
        )
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
    paddingBottom:
      theme.common.tabNavigationHeight +
      theme.common.tabNavigationInset +
      theme.space.xs,
  },
  flatList: {
    paddingTop: theme.space.s,
    paddingHorizontal: theme.space.s,
  },
}));

export default React.memo(Reviews);
