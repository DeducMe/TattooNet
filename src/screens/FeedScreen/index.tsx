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
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import IconComponent from 'components/Basic/IconComponent';
import TagList from 'components/TagList';

export default function FeedScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const context = useContext(AppContext);

  const styles = makeStyles();

  useEffect(() => {
    if (!context.feed.feed?.length) context.feed.getFeed();
  }, []);

  if (context.feed.loading || !context.feed.feed?.length)
    return <FeedSkeleton />;

  console.log('render feed');

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <CustomText style={{paddingHorizontal: theme.space.xs}} bold h2>
        Top masters
      </CustomText> */}
      <FlatList
        data={context.feed.feed}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          return (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{flexDirection: 'row'}}>
              <PressableStyled
                onPress={() => {
                  navigation.navigate('Master', {id: item.master._id});
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
                <View>
                  <FastImage
                    style={{
                      height: 180,
                      width: 230,
                      borderTopLeftRadius: theme.space.s,
                      borderTopRightRadius: theme.space.s,
                    }}
                    source={{
                      uri: item.master.avatar,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: theme.space.xs,
                      bottom: theme.space.xs,
                      position: 'absolute',
                    }}>
                    {!!item.master.rating && (
                      <StarBlock
                        noNumber
                        imageSize={15}
                        rating={Number(item.master?.rating || 5)}
                      />
                    )}
                  </View>
                </View>

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
                    <CustomText
                      numberOfLines={1}
                      style={{overflow: 'hidden'}}
                      h2>
                      {item.master.name}
                    </CustomText>
                  </View>

                  <Pressable>
                    <CustomText grayed>{item.master?.address}</CustomText>
                  </Pressable>
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    flex: 1,
                    paddingHorizontal: theme.space.xs,
                    marginBottom: theme.space.xxs,
                  }}>
                  <TagList data={item.master.styles}></TagList>
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

const makeStyles = makeStyleSheet(theme => ({
  tagStyle: {
    flexDirection: 'row',
    marginRight: theme.space.xs,
    paddingVertical: theme.space.xxxs,
    backgroundColor: theme.colors.background,
  },
}));
