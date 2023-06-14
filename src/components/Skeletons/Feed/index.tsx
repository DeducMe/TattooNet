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
        }}>
        <CustomText h1>Recommended to you</CustomText>
      </ScrollView>
    </>
  );
};

export interface IFeedSkeletonProps {}
export default FeedSkeleton;
