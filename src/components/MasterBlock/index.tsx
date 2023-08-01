import {View, Text} from 'react-native';
import React from 'react';
import useTheme from 'hooks/useTheme';
import PressableStyled from 'components/PressableStyled';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import StarBlock from 'components/StarBlock';
import CustomText from 'components/CustomText';
import TagList from 'components/TagList';

export default function MasterBlock({master}: {master: any}) {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <PressableStyled
      onPress={() => {
        navigation.navigate('Master', {id: master._id});
      }}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.5 : 1.0,
          width: 230,
          height: 300,
          marginBottom: theme.space.s,
          marginLeft: theme.space.s,
          backgroundColor: theme.colors.background,
          borderRadius: theme.space.s,
          flexDirection: 'row',
          ...theme.defaultShadow,
        },
      ]}>
      <View>
        <FastImage
          style={{
            height: 180,
            width: 230,
            borderTopLeftRadius: theme.space.s,
            borderTopRightRadius: theme.space.s,
          }}
          source={{
            uri: master.avatar,
          }}
        />
        <View
          style={{
            marginLeft: theme.space.xs,
            bottom: theme.space.xs,
            position: 'absolute',
          }}>
          {!!master.rating && (
            <StarBlock
              noNumber
              imageSize={15}
              rating={Number(master?.rating || 5)}
            />
          )}
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: theme.space.xs,
          marginTop: theme.space.xxs,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <CustomText numberOfLines={1} style={{overflow: 'hidden'}} h2>
            {master.name}
          </CustomText>
        </View>

        <PressableStyled>
          <CustomText grayed>{master?.address}</CustomText>
        </PressableStyled>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          flex: 1,
          paddingHorizontal: theme.space.xs,
          marginBottom: theme.space.xxs,
        }}>
        <TagList data={master?.styles}></TagList>
      </View>
    </PressableStyled>
  );
}
