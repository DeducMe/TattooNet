import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconComponent from 'components/Basic/IconComponent';
import useTheme from 'hooks/useTheme';
import CustomText from 'components/CustomText';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export type Tag = 'tribal' | 'newSchool' | 'watercolor' | 'blackwork';

const TagList = ({data}: {data: Tag[]}) => {
  const theme = useTheme();
  const styles = makeStyles();

  const NodeData = {
    tribal: (
      <View style={styles.tagStyle}>
        <IconComponent
          size={18}
          iconSet="MaterialCommunityIcons"
          name="spear"></IconComponent>

        <CustomText>Tribal</CustomText>
      </View>
    ),
    newSchool: (
      <View style={styles.tagStyle}>
        <IconComponent size={18} iconSet="Entypo" name="new"></IconComponent>

        <CustomText>New school</CustomText>
      </View>
    ),
    watercolor: (
      <View style={styles.tagStyle}>
        <IconComponent size={18} iconSet="Entypo" name="water"></IconComponent>

        <CustomText>Water color</CustomText>
      </View>
    ),
    blackwork: (
      <View style={styles.tagStyle}>
        <IconComponent size={18} iconSet="Ionicons" name="moon"></IconComponent>
        <CustomText>Blackwork</CustomText>
      </View>
    ),
  };

  return (
    <FlatList data={data} renderItem={({item}) => NodeData[item]}></FlatList>
  );
};

export default TagList;

const makeStyles = makeStyleSheet(theme => ({
  tagStyle: {
    flexDirection: 'row',
    marginRight: theme.space.xs,
    paddingVertical: theme.space.xxxs,
  },
}));
