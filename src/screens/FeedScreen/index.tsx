import {View, Text, FlatList, ScrollView, Image, Pressable} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FeedSkeleton from 'components/Skeletons/Feed';
import FlexWrapFlatList from 'components/FlexWrapFlatList';
import CustomText from 'components/CustomText';
import useTheme from 'hooks/useTheme';
import FastImage from 'react-native-fast-image';
import StarBlock from 'components/StarBlock';
import PressableStyled from 'components/PressableStyled';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from 'providers/AppProvider';

export default function FeedScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const context = useContext(AppContext);

  useEffect(() => {
    if (!context.feed.feed?.length) context.feed.getFeed();
  }, []);

  console.log(context.feed.feed);

  if (context.feed.loading || !context.feed.feed?.length)
    return <FeedSkeleton />;

  return (
    <SafeAreaView>
      <CustomText style={{paddingHorizontal: theme.space.xs}} bold h2>
        Top masters
      </CustomText>
      <FlatList
        data={context.feed.feed}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          console.log(item);

          return (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{flexDirection: 'row'}}>
              <PressableStyled
                onPress={() => {
                  navigation.navigate('Master', {id: item._id});
                }}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.5 : 1.0,
                    width: 230,
                    height: 300,
                    marginBottom: theme.space.s,
                    marginLeft: theme.space.s,
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.space.s,
                    flexDirection: 'row',
                    ...theme.defaultShadow,
                  },
                ]}>
                <FastImage
                  style={{
                    height: 180,
                    width: 230,
                    borderTopLeftRadius: theme.space.s,
                    borderTopRightRadius: theme.space.s,
                  }}
                  source={{
                    uri: item.avatar,
                  }}
                />
                <View
                  style={{
                    paddingHorizontal: theme.space.xs,
                    marginTop: theme.space.xxs,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <CustomText h2>{item.name}</CustomText>
                    {!!item.rating && (
                      <StarBlock
                        imageSize={15}
                        rating={Number(item?.rating || 5)}
                      />
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginTop: theme.space.xs,
                    }}>
                    <View
                      style={{
                        borderRadius: theme.space.xs,
                        borderWidth: 1,
                        marginRight: theme.space.xs,
                        paddingHorizontal: theme.space.xxs,
                        paddingVertical: theme.space.xxxs,
                        marginBottom: theme.space.xxxs,
                      }}>
                      <CustomText>some tag</CustomText>
                    </View>
                    <View
                      style={{
                        borderRadius: theme.space.xs,
                        borderWidth: 1,
                        marginRight: theme.space.xs,
                        paddingHorizontal: theme.space.xxs,
                        paddingVertical: theme.space.xxxs,
                        marginBottom: theme.space.xxxs,
                      }}>
                      <CustomText>some tag</CustomText>
                    </View>
                  </View>
                  <Pressable>
                    <CustomText grayed>{item?.address}</CustomText>
                  </Pressable>
                </View>
              </PressableStyled>
              <FlexWrapFlatList
                data={item.tattoos}
                onPress={item =>
                  navigation.navigate('TattooScreen', {
                    item,
                    available: item.type === 'available',
                  })
                }
              />
            </ScrollView>
          );
        }}></FlatList>
    </SafeAreaView>
  );
}
