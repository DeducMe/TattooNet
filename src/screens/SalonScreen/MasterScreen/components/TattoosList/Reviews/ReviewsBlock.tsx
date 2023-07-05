import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import PressableStyled from 'components/PressableStyled';
import StarBlock from 'components/StarBlock';
import CustomText from 'components/CustomText';
import IconComponent from 'components/Basic/IconComponent';
import {format} from 'date-fns';
import useTheme from 'hooks/useTheme';

function ReviewsBlock({
  images,
  date = new Date(),
  rating = 5,
  name = 'John Doe',
  reviewText = 'Example big review of a tattoo and master. Nice and not nice, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias quod placeat doloribus voluptatibus assumenda, eum dolor. Veniam, accusantium, alias corporis numquam neque, dignissimos nemo tempore vel adipisci libero aut iste.',
}: {
  images: string[];
  date?: Date;
  rating: number;
  name: string;
  reviewText: string;
}) {
  const theme = useTheme();
  const styles = makeStyles();
  return (
    <PressableStyled style={styles.container}>
      {/* <CustomText style={{ marginBottom: theme.space.xs }}>{title}</CustomText> */}
      <View style={styles.userInfoBlock}>
        <View style={styles.starNameBlock}>
          <StarBlock imageSize={15} rating={rating} noNumber={true} />

          <CustomText numberOfLines={1} style={styles.nameText}>
            {name}
          </CustomText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          {!!date ? (
            <CustomText>{format(date, 'dd MMM yyyy')}</CustomText>
          ) : (
            <CustomText style={{color: theme.colors.contrast}}>
              Date unknown
            </CustomText>
          )}
          <IconComponent
            style={{marginTop: -2}}
            color={theme.colors.contrast}
            name="chevron-right"
            iconSet="MaterialCommunityIcons"
            size={20}
          />
        </View>
      </View>
      <CustomText
        style={{
          color: !reviewText ? theme.colors.contrast : theme.colors.textColor,
        }}>
        {reviewText || 'No review message'}
      </CustomText>
      {!!images?.length && (
        <ScrollView onStartShouldSetResponder={() => true} horizontal>
          <Pressable style={{flexDirection: 'row'}}>
            {images?.map(item => {
              return (
                <>
                  <Image source={{uri: item}} style={styles.image} />
                </>
              );
            })}
          </Pressable>
        </ScrollView>
      )}
    </PressableStyled>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  container: {
    ...theme.defaultShadow,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.space.s,
    paddingVertical: theme.space.m,
    borderRadius: theme.space.s,
    width: '100%',
    marginBottom: theme.space.s,
  },
  userInfoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  image: {
    marginTop: theme.space.xxs,
    marginRight: theme.space.s,
    borderRadius: theme.space.s,
    width: 100,
    height: 100,
  },
  starNameBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: theme.space.s,
  },
  nameText: {marginLeft: theme.space.xxs},
}));

export default React.memo(ReviewsBlock);
