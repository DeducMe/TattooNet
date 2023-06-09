import {View, Text, StyleSheet, useWindowDimensions, Image} from 'react-native';
import React from 'react';

// TODO Это нормальный компонент, но не в той папке, назван правильно более менее, запихни в папку с экраном онбординга

export default function OnBoardingItem({item}: any) {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={item.image}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    paddingHorizontal: 64,
    color: 'black',
    textAlign: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
});
