import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import IconComponent from 'components/Basic/IconComponent';
import useTheme from 'hooks/useTheme';
import CustomText from 'components/CustomText';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {Tag} from 'components/TagList';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {IconPack} from 'common/getIcon';
import {AppContext} from 'providers/AppProvider';

export const TagEditable = ({
  iconSet,
  iconName,
  name,
  isChecked,
  onPress,
  disabled,
}: {
  iconSet: IconPack;
  isChecked: boolean;
  iconName: string;
  name: string;
  onPress: () => void;
  disabled?: boolean;
}) => {
  const styles = makeStyles();
  const theme = useTheme();

  return (
    <View style={styles.tagStyle}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconComponent
          size={18}
          iconSet={iconSet}
          name={iconName}></IconComponent>
        <CustomText>{name}</CustomText>
      </View>
      <BouncyCheckbox
        disabled={disabled && !isChecked}
        onPress={onPress}
        fillColor={theme.colors.primary}
        isChecked={isChecked}></BouncyCheckbox>
    </View>
  );
};

const TagListEditable = ({data}: {data: Tag[]}) => {
  const context = useContext(AppContext);
  function onPress(name: string) {
    context.myProfile.toggleStyle(name);
  }

  const NodeData = {
    tribal: (
      <TagEditable
        disabled={data.length >= 3}
        onPress={() => onPress('tribal')}
        iconSet={'MaterialCommunityIcons'}
        name="Tribal"
        iconName="spear"
        isChecked={data.includes('tribal')}
      />
    ),
    newSchool: (
      <TagEditable
        disabled={data.length >= 3}
        onPress={() => onPress('newSchool')}
        iconSet={'Entypo'}
        name="New school"
        iconName="new"
        isChecked={data.includes('newSchool')}
      />
    ),
    watercolor: (
      <TagEditable
        disabled={data.length >= 3}
        onPress={() => onPress('watercolor')}
        iconSet={'Entypo'}
        name="Water color"
        iconName="water"
        isChecked={data.includes('watercolor')}
      />
    ),
    blackwork: (
      <TagEditable
        disabled={data.length >= 3}
        onPress={() => onPress('blackwork')}
        iconSet={'Ionicons'}
        name="Blackwork"
        iconName="moon"
        isChecked={data.includes('blackwork')}
      />
    ),
  };

  return (
    <FlatList
      data={Object.values(NodeData)}
      renderItem={({item}) => item}></FlatList>
  );
};

export default TagListEditable;

const makeStyles = makeStyleSheet(theme => ({
  tagStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: theme.space.xs,
    paddingVertical: theme.space.xxxs,
  },
}));
