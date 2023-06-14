import {View, Text, FlatList, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import useTheme from 'hooks/useTheme';
import CustomText from 'components/CustomText';
import ReviewsBlock from 'screens/SalonScreen/MasterScreen/components/TattoosList/Reviews/ReviewsBlock';
import {ActionButton} from 'components/ActionButton';
import {useNavigation} from '@react-navigation/native';

export default function TattooScreen({
  available = !!Math.round(Math.random()),
}: {
  available: boolean;
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({item, index}) => {
            let width = Math.round(300 * Math.random() * 2);
            if (width < 150) width = 150;
            if (width > theme.dimensions.width) width = theme.dimensions.width;

            let height = Math.round(300 * Math.random() * 2);
            if (height < 150) height = 150;
            if (height > theme.dimensions.width)
              height = theme.dimensions.width;
            return (
              <View
                style={{
                  width: theme.dimensions.width,
                  height: 350,
                  backgroundColor: '#000',
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FastImage
                  resizeMode="contain"
                  style={{width: '100%', height: '100%'}}
                  source={{
                    uri: `https://picsum.photos/${width}/${height}?random=${index}`,
                  }}
                />
              </View>
            );
          }}
          pagingEnabled
          data={Array.from({length: 10})}
        />
      </View>
      <View
        style={{
          paddingHorizontal: theme.space.s,
          marginTop: theme.space.s,
        }}>
        <View>
          <CustomText
            style={{
              lineHeight: 22,
            }}
            h1
            bold>
            Tattoo Name
          </CustomText>
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
              Master name
            </CustomText>
          </View>
        </View>

        {available ? (
          <View
            style={{justifyContent: 'center', marginTop: theme.space.xxxxl}}>
            <CustomText centered h2>
              This tattoo is available!
            </CustomText>
            <ActionButton
              onPress={() => navigation.navigate('Master')}
              style={{marginTop: theme.space.l}}
              roundButton
              title="Master"
            />
          </View>
        ) : (
          <View style={{marginTop: theme.space.s}}>
            <ReviewsBlock></ReviewsBlock>
            <ActionButton
              onPress={() => navigation.navigate('Master')}
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
