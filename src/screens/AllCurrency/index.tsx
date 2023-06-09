import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {AppContext} from 'providers/AppProvider';
import CurrencyItem from './CurrencyItem';
import SearchBar from 'components/Basic/SearchBar';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/DefaultStackNavigator';
import useTheme from 'hooks/useTheme';

export default function AllCurrencyScreen({
  route,
}: {
  route: {params: {id: string}};
}) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const context = useContext(AppContext);
  const allCurrencyData = context.currency.currency;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [selected, setSelected] = useState(context.currency.chosenId);
  const [searchItem, setSearchItem] = useState('');

  const toggleSelect = useCallback((id: any) => {
    navigation.goBack();
    setSelected(id);
    context.currency.setChosenId?.(id);
  }, []);

  const transformedData = useMemo(
    () =>
      allCurrencyData?.map(item => ({
        id: item._id,
        title: `${item.sysname} - ${item.name}`,
      })),
    [allCurrencyData],
  );

  const filteredData = useMemo(
    () =>
      transformedData?.filter(item =>
        item.title.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()),
      ),
    [searchItem, transformedData],
  );

  return (
    <View>
      <FlatList
        data={filteredData}
        extraData={selected}
        initialNumToRender={20}
        ListHeaderComponent={
          <SearchBar
            styles={styles.searchInput}
            placeholder={'Search'}
            onChangeText={setSearchItem}
            value={searchItem}
          />
        }
        renderItem={({item}) => (
          <CurrencyItem
            id={item.id}
            title={item.title}
            selected={selected === item.id}
            onPress={() => toggleSelect(item.id)}
          />
        )}
        keyExtractor={item => item.id}></FlatList>
    </View>
  );
}

const makeStyles = (theme: any) =>
  StyleSheet.create({
    containder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchInput: {
      alignSelf: 'center',
      width: '98%',
      height: 40,
      borderWidth: 1,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 10,
    },
  });
