import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gravatar} from 'react-native-gravatar';
import CustomText from 'components/CustomText';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {ActionButton} from 'components/ActionButton';
import IconComponent from 'components/Basic/IconComponent';
import useTheme from 'hooks/useTheme';
import PressableStyled from 'components/PressableStyled';
import BottomSheet from 'components/Basic/BottomSheet';
import {Modalize} from 'react-native-modalize';
import {useNavigation} from '@react-navigation/native';
import SocialButtons from 'components/SocialButtons';

export default function MasterProfileHeader() {
  const modalizeRef = useRef<Modalize>(null);
  const navigation = useNavigation();
  const styles = makeStyles();
  const theme = useTheme();

  // useEffect(() => {
  //   if (modalizeRef.current) {
  //     modalizeRef.current?.open();
  //   }
  // }, [modalizeRef.current]);

  const [favorite, setFavorite] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <Gravatar
          style={styles.avatar}
          options={{
            email: 'example@gmail.com',
            parameters: {size: '300', d: 'mm'},
            secure: true,
          }}
        />
        <View style={styles.userInfo}>
          <CustomText h1>Name</CustomText>
          <CustomText>address</CustomText>

          <ActionButton
            onPress={() => modalizeRef.current?.open()}
            style={styles.followButton}
            roundButton
            title="Contact"
          />
        </View>
        <PressableStyled
          onPress={() => {
            setFavorite(!favorite);
          }}
          style={{
            position: 'absolute',
            right: theme.dimensions.width * 0.1,
            top: theme.space.xs,
          }}>
          <IconComponent
            iconSet="AntDesign"
            name={favorite ? 'heart' : 'hearto'}
            color={theme.colors.error}
            size={30}
          />
        </PressableStyled>
      </View>
      <BottomSheet
        // onClose={() => modalizeRef.current?.close()}
        modalizeRef={modalizeRef}>
        <View style={styles.bottomSheetContainer}>
          <PressableStyled>
            <CustomText>phone number</CustomText>
          </PressableStyled>
          <SocialButtons
            data={[
              {type: 'facebook', link: 'facebook.com'},
              {type: 'vk', link: 'vk.com'},
            ]}
          />
        </View>
      </BottomSheet>
    </>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  bottomSheetContainer: {
    paddingHorizontal: theme.space.xs,
    paddingVertical: theme.space.s,
  },
  avatar: {
    borderRadius: 30,
    width: 100,
    height: 100,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    marginVertical: theme.space.xs,
  },
  userInfo: {
    width: theme.dimensions.width * 0.3,
    marginLeft: theme.space.l,
    marginRight: theme.dimensions.width * 0.15,
  },

  followButton: {
    marginTop: theme.space.s,
    paddingVertical: theme.space.xxxs,
    paddingHorizontal: theme.space.xxs,
  },
}));
