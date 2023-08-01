import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {AppContext} from 'providers/AppProvider';
import TagList from 'components/TagList';
import TagListEditable from 'components/TagListEditable';
import CustomText from 'components/CustomText';
import useTheme from 'hooks/useTheme';

export default function AddTags() {
  const context = useContext(AppContext);
  const theme = useTheme();

  return (
    <View>
      <View style={{marginHorizontal: theme.space.xs}}>
        <CustomText h2>Add tattoo styles that you practice </CustomText>
        <CustomText sub>3 max</CustomText>
      </View>

      <TagListEditable
        data={context.myProfile.profile.styles || []}></TagListEditable>
    </View>
  );
}
