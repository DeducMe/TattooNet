import {FlatList} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListEmptyComponent} from 'components/LIstEmptyComponent';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from 'providers/AppProvider';
import MasterBlock from 'components/MasterBlock';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const context = useContext(AppContext);
  console.log(context.favorites.favorites);
  return (
    <FlatList
      ListEmptyComponent={
        <ListEmptyComponent
          title="Favorites"
          description="Your favorite tattoos, masters and salons will be listed here"
          buttonTitle="Find Tattoos"
          onPress={() => navigation.navigate('Feed')}
        />
      }
      renderItem={({item}) => {
        return <MasterBlock master={item.master} />;
      }}
      data={context.favorites.favorites.filter(
        item => !!item.master,
      )}></FlatList>
  );
}
