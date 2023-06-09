import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import React from 'react';

// TODO Это вроде бы нормальный компонент, но подумай как можно по другому назвать и с типами тоже разберись, убери any

export default function Paginator({data, scrollX}: any) {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.dotContainer}>
      {data.map((item: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    // TODO юзай тему для цветов, добавляй туда по необходимости

    backgroundColor: 'black',
    marginHorizontal: 8,
  },
  dotContainer: {
    flexDirection: 'row',
    height: 64,
  },
});
