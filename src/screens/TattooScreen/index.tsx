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
import {AppContext} from 'providers/AppProvider';

function TattooScreen({
  route,
}: {
  route: {params: {available: boolean; item: Tattoo}};
}) {
  const {available, item} = route.params || {};
  const context = useContext(AppContext);
  const navigation = useNavigation();
  const theme = useTheme();

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
            <CustomText
              bold
              style={{
                color: theme.colors.primary,
                marginLeft: theme.space.xxs,
                lineHeight: 21,
              }}>
              {item.masterProfile?.name}
            </CustomText>
          </View>
          <CustomText
            style={{
              fontSize: theme.fontSizes.small,
              lineHeight: 22,
            }}>
            {item.description}
          </CustomText>
        </View>

        {available ? (
          <View
            style={{justifyContent: 'center', marginTop: theme.space.xxxxl}}>
            <CustomText centered h2>
              This tattoo is available!
            </CustomText>
            <ActionButton
              onPress={() =>
                navigation.navigate(
                  item.masterProfile._id === context.profile.profile._id
                    ? 'Profile'
                    : 'Master',
                  {id: item.masterProfile._id},
                )
              }
              style={{marginTop: theme.space.l}}
              roundButton
              title="Master"
            />
          </View>
        ) : (
          <View style={{marginTop: theme.space.s}}>
            <ReviewsBlock></ReviewsBlock>
            <ActionButton
              onPress={() =>
                navigation.navigate(
                  item.masterProfile._id === context.profile.profile._id
                    ? 'Profile'
                    : 'Master',
                  {id: item.masterProfile._id},
                )
              }
              style={{marginVertical: theme.space.l}}
              roundButton
              title="Master"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default React.memo(TattooScreen);
