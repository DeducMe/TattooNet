import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListEmptyComponent} from 'components/LIstEmptyComponent';
import {useNavigation} from '@react-navigation/native';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ListEmptyComponent
        title="Favorites"
        description="Your favorite tattoos, masters and salons will be listed here"
        buttonTitle="Find Tattoos"
        onPress={() => navigation.navigate('Feed')}
      />
    </SafeAreaView>
  );
}
