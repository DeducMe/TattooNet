import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListEmptyComponent} from 'components/LIstEmptyComponent';

export default function FavoritesScreen() {
  return (
    <SafeAreaView>
      <ListEmptyComponent
        title="Favorites"
        description="Your favorite Tatoos, masters and salons will be listed here"
      />
    </SafeAreaView>
  );
}
