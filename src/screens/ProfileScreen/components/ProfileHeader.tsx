import {View, Text, Pressable, Image} from 'react-native';
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
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
import StyledControlledTextInput from 'components/StyledControlledTextInput';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import PhoneCodePicker from 'components/PhoneCodePicker';
import Separator from 'components/Basic/Separator';
import {AppContext} from 'providers/AppProvider';

import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import Gravatar from 'components/Gravatar';
import {schema} from '../validationSchema';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import ProfileDataForm from 'components/ProfileDataForm';
import ImageCropPicker from 'react-native-image-crop-picker';
import HeartButton from 'components/HeartButton';
export type ProfileHeaderProps = {
  editable?: boolean;
};

export const createFormData = async (photo: any) => {
  console.log(photo);
  const a = await RNFS.readFile(
    Platform.OS === 'ios' && !photo.uri.includes('file:///')
      ? 'file:///' + photo.uri.replace('file://', '')
      : photo.uri,
    'base64',
  ).catch(e => {
    Toast.show({
      text1: 'File was not loaded',
      type: 'error',
    });
    return null;
  });

  return a;
};

function ProfileHeader({editable}: ProfileHeaderProps) {
  const modalizeRef = useRef<Modalize>(null);
  const editableModalizeRef = useRef<Modalize>(null);
  const navigation = useNavigation();
  const styles = makeStyles();
  const theme = useTheme();
  const context = useContext(AppContext);

  // useEffect(() => {
  //   if (modalizeRef.current) {
  //     modalizeRef.current?.open();
  //   }
  // }, [modalizeRef.current]);

  function loadAvatar() {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropperCircleOverlay: true,
      cropping: true,
    }).then((image: any) => {
      console.log(image);

      context.myProfile.updateAvatar({
        avatar: image,
      });
    });
  }

  function editInfo() {
    editableModalizeRef.current?.open();
  }

  function onSave() {
    editableModalizeRef.current?.close();
  }

  return (
    <>
      <View style={styles.container}>
        <PressableStyled
          disabled={!editable}
          onPress={() => {
            editable && loadAvatar();
          }}>
          <Gravatar
            sourceUri={context.myProfile?.profile?.avatar}
            style={styles.avatar}
            options={{
              email: 'example@gmail.com',
              parameters: {size: '300', d: 'mm'},
              secure: true,
            }}
          />
        </PressableStyled>
        <View style={styles.userInfo}>
          <CustomText h1>
            {context.myProfile.profile?.name || 'Name'}
          </CustomText>
          <CustomText numberOfLines={2}>
            {context.myProfile.profile?.address || 'Address'}
          </CustomText>
          {editable && (
            <ActionButton
              onPress={() => {
                if (editable) return editInfo();
                modalizeRef.current?.open();
              }}
              style={styles.followButton}
              roundButton
              title={editable ? 'Edit info' : 'Contact'}
            />
          )}
        </View>
        {/* {!editable && (
          <HeartButton
            type="master"
            id={context.myProfile.profile?._id}></HeartButton>
        )} */}
      </View>

      <BottomSheet modalHeight={500} modalizeRef={editableModalizeRef}>
        <ProfileDataForm onSave={onSave}></ProfileDataForm>
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

export default React.memo(ProfileHeader);
