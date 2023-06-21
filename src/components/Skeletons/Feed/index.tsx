import React from 'react';
import {FlatList, Pressable, ScrollView, View} from 'react-native';
import useTheme from 'hooks/useTheme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useNavigation} from '@react-navigation/native';
import {ActionButton} from 'components/ActionButton';
import CustomText from 'components/CustomText';
import {Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import FlexWrapFlatList from 'components/FlexWrapFlatList';

const FeedSkeleton: React.FC<IFeedSkeletonProps> = ({}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <>
      {/* <ActionButton
        title="Salon"
        onPress={() => navigation.navigate('Salon', {})}
      /> */}
      <ScrollView
        style={{
          marginBottom: theme.common.tabNavigationHeight + theme.space.m,
          paddingHorizontal: theme.space.s,
        }}>
        <CustomText style={{paddingHorizontal: theme.space.xs}} bold h2>
          Top masters
        </CustomText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <SkeletonPlaceholder backgroundColor={theme.colors.backgroundDarker}>
            <SkeletonPlaceholder.Item
              marginTop={theme.space.s}
              flexDirection="row">
              {Array.from({length: 3}, (x, i) => {
                return (
                  <SkeletonPlaceholder.Item
                    key={i}
                    width={230}
                    height={300}
                    marginRight={theme.dimensions.width / 24}
                    borderRadius={4}
                    style={{
                      marginBottom: theme.space.s,
                      backgroundColor: theme.colors.background,
                      borderRadius: theme.space.s,
                      ...theme.defaultShadow,
                    }}
                  />
                );
              })}
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </ScrollView>
      </ScrollView>
    </>
  );
};

export interface IFeedSkeletonProps {}
export default FeedSkeleton;
