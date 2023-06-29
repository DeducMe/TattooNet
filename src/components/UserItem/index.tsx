import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import Gravatar from 'components/Gravatar';
import CustomText from 'components/CustomText';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

function UserItem({
  avatar,
  name,
  avatarStyle,
}: {
  avatar: string;
  name: string;
  avatarStyle?: StyleProp<ViewStyle>;
}) {
  const styles = makeStyles();
  return (
    <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
      <Gravatar
        sourceUri={avatar}
        style={avatarStyle}
        options={{
          email: 'example@gmail.com',
          parameters: {size: '300', d: 'mm'},
          secure: true,
        }}
      />
      <CustomText style={styles.itemText}>{name}</CustomText>
    </View>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  itemText: {marginLeft: theme.space.s},
}));

export default React.memo(UserItem);
