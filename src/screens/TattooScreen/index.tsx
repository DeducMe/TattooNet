import {View, Text, FlatList, Image, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import FastImage from 'react-native-fast-image';
import useTheme from 'hooks/useTheme';
import CustomText from 'components/CustomText';
import ReviewsBlock from 'screens/SalonScreen/MasterScreen/components/TattoosList/Reviews/ReviewsBlock';
import {ActionButton} from 'components/ActionButton';
import {useNavigation} from '@react-navigation/native';
import GalleryList from 'components/GalleryList';
import {Tattoo} from 'hooks/providerHooks/useMaster';
import {AppContext, AppPostContextProvider} from 'providers/AppProvider';
import PressableStyled from 'components/PressableStyled';

function TattooScreen({
  route,
}: {
  route: {params: {available: boolean; item: Tattoo}};
}) {
  const {available, item} = route.params || {};
  const context = useContext(AppContext);
  const postContext = useContext(AppPostContextProvider);
  const navigation = useNavigation();
  const theme = useTheme();

  function completeTattoo() {
    const isMaster = item.masterProfile._id === context.myProfile.profile._id;

    if (isMaster && !item.reviews?.length)
      navigation.navigate('CompleteTattoo', {
        id: item._id,
        isMaster,
        masterId: item.masterProfile._id,
      });
    else {
      const body = {
        _id: item._id,
        masterId: item.masterProfile._id,
      };

      postContext.tattoo.submitTattoo(body);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <GalleryList data={item.images} />
      </View>
      <View
        style={{
          paddingHorizontal: theme.space.s,
          marginTop: theme.space.s,
        }}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText
              style={{
                lineHeight: 22,
              }}
              h1
              bold>
              {item.name}
            </CustomText>

            <CustomText
              style={{
                lineHeight: 22,
              }}
              bold>
              {item.price} {item.currency?.symbol}
            </CustomText>
          </View>
          <View style={{flexDirection: 'row', marginLeft: theme.space.xxxs}}>
            <CustomText
              style={{
                fontSize: theme.fontSizes.small,
                lineHeight: 22,
              }}>
              by
            </CustomText>
            <PressableStyled
              onPress={() =>
                navigation.navigate(
                  item.masterProfile._id === context.myProfile.profile._id
                    ? 'Profile'
                    : 'Master',
                  {id: item.masterProfile._id},
                )
              }>
              <CustomText
                bold
                style={{
                  color: theme.colors.primary,
                  marginLeft: theme.space.xxs,
                  lineHeight: 21,
                }}>
                {item.masterProfile?.name}
              </CustomText>
            </PressableStyled>
          </View>
          <CustomText
            style={{
              fontSize: theme.fontSizes.small,
              lineHeight: 22,
            }}>
            {item.description}
          </CustomText>
        </View>

        {item.reviews?.map(item => (
          <ReviewsBlock
            images={item.images}
            name={item.name}
            reviewText={item.text}
            rating={item.rating}
            date={new Date(item.updatedAt)}></ReviewsBlock>
        ))}

        {available && (
          <View
            style={{
              justifyContent: 'center',
              marginTop: theme.space.xxxxl,
              marginBottom: theme.space.s,
            }}>
            <CustomText centered h2>
              This tattoo is available!
            </CustomText>
            <ActionButton
              onPress={completeTattoo}
              style={{marginTop: theme.space.l}}
              roundButton
              title={
                item.masterProfile._id === context.myProfile.profile._id
                  ? 'Complete tattoo'
                  : 'I have this on me!'
              }
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default React.memo(TattooScreen);
