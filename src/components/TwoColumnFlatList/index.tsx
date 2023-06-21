import React from 'react';
import {FlatList} from 'react-native';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import useTheme from 'hooks/useTheme';
import FastImage from 'react-native-fast-image';
import PressableStyled from 'components/PressableStyled';
import {useNavigation} from '@react-navigation/native';

export default function TwoColumnFlatList({
  editable,
  marginTabBar,
}: {
  editable?: boolean;
  marginTabBar?: boolean;
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
      data={Array.from({length: 20})}
      renderItem={({item, index}) => {
        return (
          <PressableStyled
            onPress={() => navigation.navigate('TattooScreen')}
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
                uri: `https://picsum.photos/180/150`,
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
