import React from 'react';
import {FlatList} from 'react-native';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import useTheme from 'hooks/useTheme';
import FastImage from 'react-native-fast-image';
import PressableStyled from 'components/PressableStyled';
import {useNavigation} from '@react-navigation/native';
import {Tattoo} from 'hooks/providerHooks/useMaster';

export default function TwoColumnFlatList({
  editable,
  available,
  marginTabBar,
  data,
}: {
  editable?: boolean;
  available?: boolean;
  marginTabBar?: boolean;
  data: Tattoo[];
}) {
  const styles = makeStyles();
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <FlatList
      style={styles.flatList}
      contentContainerStyle={{
        paddingBottom: marginTabBar ? theme.common.tabNavigationHeight : 0,
      }}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      numColumns={2}
      data={data}
      renderItem={({item, index}) => {
        return (
          <PressableStyled
            onPress={() =>
              navigation.navigate('TattooScreen', {item, available})
            }
            style={{
              marginTop: theme.space.xs,
              borderRadius: theme.space.s,
              ...theme.defaultShadow,
              overflow: 'hidden',
              backgroundColor: theme.colors.background,
              height: 180,
              width: theme.dimensions.width / 2 - theme.space.s * 1.5,
            }}>
            <FastImage
              style={{height: 180}}
              source={{
                uri: item.images?.[0],
              }}
            />
          </PressableStyled>
        );
      }}></FlatList>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flatList: {},
}));
