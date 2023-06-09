import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  Pressable,
} from 'react-native';
import {useTheme} from '../../common/theme';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'common/types';
import {AppContext} from 'providers/AppProvider';

//TODO FlatListItem плохое название, лучше что-то типо AssetsListItem и запихни это в папку, где используешь этот компоненет

export default function FlatListItem({
  item,
  setSelectedItem,
  selectedItem,
}: any) {
  const {width} = useWindowDimensions();
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const styles = makeStyles(theme);
  const context = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.card}
        onLongPress={() => setSelectedItem(item)}
        onPress={() => {
          navigation.navigate('AssetsDetailsScreen', {item});
          context.chooseCurrencyId.setChooseCurrencyId?.(item.currency?._id);
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={{width: '100%', height: 80}}>
            <Text style={styles.textTitle}>{item.name}</Text>
          </View>
          <Text
            style={{
              alignSelf: 'flex-start',
              fontSize: 18,
              fontWeight: '500',
              color: theme.colors.GREY,
            }}>{`Qty: ${1}`}</Text>
          <Text
            style={{
              alignSelf: 'flex-start',
              fontSize: 20,
              color: theme.colors.GREY,
              fontWeight: '500',
              marginTop: 5,
            }}>
            {`${item.price} ${item.currency?.symbol}`}
          </Text>
          <View
            style={{
              width: '80%',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.colors.BLACK,
              alignItems: 'center',
              marginTop: 5,
            }}>
            {item.categories.map(item => (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: theme.colors.BLACK,
                }}>
                {item.name}
              </Text>
            ))}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '48%',
      shadowColor: theme.colors.BLACK,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.8,
      shadowRadius: 6,

      backgroundColor: 'white',
      borderRadius: 12,
      elevation: 5,
    },
    card: {
      width: '100%',
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      paddingHorizontal: 5,
    },
    textTitle: {
      alignSelf: 'flex-start',
      marginTop: 5,
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.BLACK,
    },
    textDescription: {
      fontSize: 18,
      color: theme.colors.BLACK,
    },
    image: {
      width: '95%',
      height: '40%',
      resizeMode: 'contain',
    },
    chipCategory: {
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.BLACK,
      borderRadius: 6,
      height: 26,
      marginTop: -13,
      backgroundColor: theme.colors.WHITE,
    },
  });

// <View style={[styles.container, {width}]}>
//   <TouchableOpacity
//     onPress={() => {
//       navigation.navigate('AssetsDetailsScreen', {item});
//       context.chooseCurrencyId.setChooseCurrencyId?.(item.currency?._id);
//     }}>
//     <View style={styles.card}>
//       {item.categories.map(item => (
//         <View
//           style={{
//             alignItems: 'center',
//           }}>
//           <Image source={{uri: item.image}} style={styles.image} />
//           <View style={styles.chipCategory}>
//             <Text style={styles.textDescription}>{item.name}</Text>
//           </View>
//         </View>
//       ))}
//       <Text style={styles.textTitle}>{item.name}</Text>
//     </View>
//   </TouchableOpacity>
// </View>
