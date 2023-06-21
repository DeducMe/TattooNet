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
    context.feed.getFeed();
  }, []);

  if (context.feed.loading) return <FeedSkeleton />;

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomText style={{paddingHorizontal: theme.space.xs}} bold h2>
          Top masters
        </CustomText>
        <FlatList
          data={Array.from({length: 6})}
          style={{
            paddingHorizontal: theme.space.s,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <PressableStyled
                onPress={() => {
                  navigation.navigate('Master', {});
                }}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.5 : 1.0,
                    width: 230,
                    height: 300,
                    marginRight: theme.dimensions.width / 24,
                    marginBottom: theme.space.s,
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.space.s,
                    ...theme.defaultShadow,
                  },
                ]}>
                <FastImage
                  style={{
                    height: 180,
                    width: '100%',
                    borderTopLeftRadius: theme.space.s,
                    borderTopRightRadius: theme.space.s,
                  }}
                  source={{
                    uri: `https://picsum.photos/180/230`,
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
                    <CustomText h2>Name</CustomText>
                    <StarBlock imageSize={15} rating={Number(5)} />
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
                    <CustomText grayed>address here</CustomText>
                  </Pressable>
                </View>
              </PressableStyled>
            );
          }}></FlatList>
        <CustomText style={{paddingHorizontal: theme.space.xs}} bold h2>
          Top tattoos
        </CustomText>
        <FlexWrapFlatList onPress={() => navigation.navigate('TattooScreen')} />
      </ScrollView>
    </SafeAreaView>
  );
}
