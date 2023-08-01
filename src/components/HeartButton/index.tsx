import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import PressableStyled from 'components/PressableStyled';
import useTheme from 'hooks/useTheme';
import IconComponent from 'components/Basic/IconComponent';
import {AppContext} from 'providers/AppProvider';

export default function HeartButton({
  type,
  item,
}: {
  type: 'master' | 'tattoo';
  item: any;
}) {
  const theme = useTheme();
  const context = useContext(AppContext);
  const [favorite, setFavorite] = useState(
    context.favorites.favorites.map(el => el[type]?._id).includes(item._id),
  );
  function onPress() {
    setFavorite(!favorite);
    console.log(favorite, 'test');
    if (!favorite) context.favorites.addFavorite({type, item});
    else context.favorites.removeFavorite({type, id: item._id});
  }
  return (
    <PressableStyled
      onPress={onPress}
      style={{
        position: 'absolute',
        left: theme.space.xs,
        top: theme.space.xs,
      }}>
      <IconComponent
        iconSet="AntDesign"
        name={favorite ? 'heart' : 'hearto'}
        color={theme.colors.error}
        size={30}
      />
    </PressableStyled>
  );
}
