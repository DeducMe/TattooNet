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
import MasterBlock from 'components/MasterBlock';

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
              <MasterBlock master={item.master} />
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
