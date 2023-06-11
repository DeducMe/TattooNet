import React from 'react';
import {ScrollView} from 'react-native';
import useTheme from 'hooks/useTheme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MasterSkeleton: React.FC<IMasterSkeletonProps> = ({}) => {
  const theme = useTheme();
  return (
    <>
      <ScrollView
        style={{
          marginBottom: theme.common.tabNavigationHeight + theme.space.m,
        }}>
        <SkeletonPlaceholder backgroundColor={theme.colors.backgroundDarker}>
          <SkeletonPlaceholder.Item
            width={theme.dimensions.width}
            height={200}
          />
        </SkeletonPlaceholder>

        <SkeletonPlaceholder backgroundColor={theme.colors.backgroundDarker}>
          <SkeletonPlaceholder.Item
            marginTop={theme.space.s}
            flexDirection="row">
            {Array.from({length: 3}, (x, i) => {
              return (
                <SkeletonPlaceholder.Item
                  key={i}
                  width={theme.dimensions.width / 4}
                  height={100}
                  marginHorizontal={theme.dimensions.width / 24}
                  borderRadius={4}
                />
              );
            })}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>

        <SkeletonPlaceholder backgroundColor={theme.colors.backgroundDarker}>
          <SkeletonPlaceholder.Item padding={theme.space.s}>
            {Array.from({length: 4}, (x, i) => {
              return (
                <SkeletonPlaceholder.Item
                  key={i}
                  marginTop={theme.space.s}
                  width={300}
                  height={20}
                  borderRadius={4}
                />
              );
            })}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
        <SkeletonPlaceholder backgroundColor={theme.colors.backgroundDarker}>
          <SkeletonPlaceholder.Item padding={theme.space.s}>
            {Array.from({length: 4}, (x, i) => {
              return (
                <SkeletonPlaceholder.Item
                  key={i}
                  marginTop={theme.space.s}
                  width={300}
                  height={20}
                  borderRadius={4}
                />
              );
            })}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
        <SkeletonPlaceholder backgroundColor={theme.colors.backgroundDarker}>
          <SkeletonPlaceholder.Item
            marginTop={theme.space.s}
            flexDirection="row">
            {Array.from({length: 2}, (x, i) => {
              return (
                <SkeletonPlaceholder.Item
                  key={i}
                  width={theme.dimensions.width / 2}
                  height={100}
                  marginHorizontal={theme.space.s}
                  borderRadius={theme.space.xs}
                />
              );
            })}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </ScrollView>
    </>
  );
};

export interface IMasterSkeletonProps {}
export default MasterSkeleton;
