import {ScrollView} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import useTheme from 'hooks/useTheme';

export default function MasterAroundSkeleton() {
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingLeft: theme.space.s,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}>
      <SkeletonPlaceholder backgroundColor={theme.colors.backgroundDarker}>
        <SkeletonPlaceholder.Item flexDirection="row">
          {Array.from({length: 6}, (x, i) => {
            return (
              <SkeletonPlaceholder.Item
                key={i}
                width={230}
                height={100}
                marginRight={theme.dimensions.width / 24}
                borderRadius={4}
                style={{
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
  );
}
