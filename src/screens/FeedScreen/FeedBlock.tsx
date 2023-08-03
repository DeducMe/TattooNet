import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MasterBlock from 'components/MasterBlock';
import FlexWrapFlatList from 'components/FlexWrapFlatList';
import {useNavigation} from '@react-navigation/native';

const FeedBlock = ({item}: {item: any}) => {
  const navigation = useNavigation();
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
};

export default FeedBlock;
