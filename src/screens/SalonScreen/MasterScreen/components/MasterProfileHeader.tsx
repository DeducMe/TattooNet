import {View, Text, Pressable, Image, Linking, ScrollView} from 'react-native';
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
import {masterEditable} from './validationSchema';
import PhoneCodePicker from 'components/PhoneCodePicker';
import Separator from 'components/Basic/Separator';
import {AppContext} from 'providers/AppProvider';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import Gravatar from 'components/Gravatar';
import LoadingView from 'components/Basic/LoadingView';
import ImageCropPicker from 'react-native-image-crop-picker';
import TagList from 'components/TagList';
import HeartButton from 'components/HeartButton';

export type MasterProfileHeaderProps = {
  editable?: boolean;
};

export const createFormData = async (photo: any) => {
  const a = await RNFS.readFile(
    Platform.OS === 'ios'
      ? 'file:///' + photo.uri.replace('file://', '')
      : photo.uri,
    'base64',
  );

  return a;
};

function MasterProfileHeader({editable}: MasterProfileHeaderProps) {
  const modalizeRef = useRef<Modalize>(null);
  const editableModalizeRef = useRef<Modalize>(null);
  const navigation = useNavigation();
  const styles = makeStyles();
  const theme = useTheme();
  const context = useContext(AppContext);

  const data = editable ? context.myProfile?.profile : context.master.master;
  const loading = useMemo(
    () =>
      editable ? context.myProfile?.loading : context.master.loading.master,
    [context.myProfile?.loading, context.master.loading.master],
  );
  const [favorite, setFavorite] = useState(false);
  const [phoneCodeModalVisible, setPhoneCodeModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    data?.phoneCode || '+7',
  );

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
      context.myProfile.updateAvatar({
        avatar: image,
      });
    });
  }

  function onPhonePress() {
    const phoneNumber = data.phoneCode + data.phone;
    Linking.openURL(`tel:${phoneNumber}`);
  }

  function editInfo() {
    editableModalizeRef.current?.open();
  }

  async function submitInfo(payload: any) {
    const {email, phone, name} = payload || {};
    await context.myProfile.updateProfile({
      email,
      phone,
      name,
      phoneCode: selectedCountry,
    });
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(masterEditable),
  });

  return (
    <>
      <LoadingView loading={loading} style={styles.container}>
        <PressableStyled
          disabled={!editable}
          style={{justifyContent: 'center'}}
          onPress={() => {
            editable && loadAvatar();
          }}>
          <Gravatar
            sourceUri={data?.avatar}
            style={styles.avatar}
            options={{
              email: 'example@gmail.com',
              parameters: {size: '300', d: 'mm'},
              secure: true,
            }}
          />
          {!editable && !!data && (
            <HeartButton type="master" item={data}></HeartButton>
          )}
        </PressableStyled>
        <View style={styles.userInfo}>
          <CustomText h1>{data?.name}</CustomText>
          <CustomText>{data?.address}</CustomText>

          <ActionButton
            onPress={() => {
              if (editable) return editInfo();
              modalizeRef.current?.open();
            }}
            style={styles.followButton}
            roundButton
            title={editable ? 'Edit info' : 'Contact'}
          />
        </View>
      </LoadingView>
      {!editable && !!data && (
        <BottomSheet modalizeRef={modalizeRef}>
          <View style={styles.bottomSheetContainer}>
            {!!data.phoneCode && !!data.phone && (
              <PressableStyled onPress={onPhonePress}>
                <CustomText>Phone:</CustomText>
                <CustomText>{data.phoneCode + data.phone}</CustomText>
              </PressableStyled>
            )}
            {/* <SocialButtons
            data={[
              {type: 'facebook', link: 'facebook.com'},
              {type: 'vk', link: 'vk.com'},
            ]}
          /> */}
          </View>
        </BottomSheet>
      )}

      <BottomSheet modalHeight={570} modalizeRef={editableModalizeRef}>
        <ScrollView
          style={[styles.bottomSheetContainer, {height: 570}]}
          contentContainerStyle={{
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              marginTop: theme.space.xs,
            }}>
            <StyledControlledTextInput
              defaultValue={data?.name}
              containerStyle={{marginBottom: theme.space.xs}}
              staticHolder="Name"
              errorMessage={errors.email?.message || ''}
              control={control}
              name="name"
              label="Name"
            />

            <StyledControlledTextInput
              defaultValue={data?.email}
              containerStyle={{marginBottom: theme.space.xs}}
              staticHolder="Email"
              errorMessage={errors.email?.message || ''}
              control={control}
              name="email"
              label="Email"
            />
            <View style={{marginBottom: theme.space.xs}}>
              <CustomText>Phone</CustomText>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <PressableStyled
                    style={{
                      width: 50,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setPhoneCodeModalVisible(true)}>
                    <View
                      style={{
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        backgroundColor: 'rgba(128, 128, 128, 0.1)',
                        borderRadius: theme.space.s,
                      }}>
                      <CustomText>{selectedCountry}</CustomText>
                    </View>
                    <PhoneCodePicker
                      visible={phoneCodeModalVisible}
                      onDismiss={() => setPhoneCodeModalVisible(false)}
                      onChooseCountry={country => {
                        setSelectedCountry(country);
                        // setCountryCode && setCountryCode(country);
                      }}
                    />
                  </PressableStyled>
                </View>

                <StyledControlledTextInput
                  containerStyle={{
                    marginLeft: theme.space.s,
                    flex: 1,
                  }}
                  style={{
                    height: 30,
                    width: '100%',
                    alignItems: 'center',
                  }}
                  inputStyle={{
                    height: 50,
                  }}
                  defaultValue={data?.phone}
                  hideTitle
                  staticHolder="Phone"
                  errorMessage={errors.phone?.message || ''}
                  control={control}
                  name="phone"
                  label="Phone"
                />
              </View>
            </View>
            <View>
              <CustomText>Address</CustomText>

              <View
                style={{
                  borderRadius: theme.space.xs,
                  borderWidth: 1,
                  borderColor: theme.colors.contrast,
                  paddingVertical: theme.space.xs,
                  paddingHorizontal: theme.space.s,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <CustomText bold style={{marginBottom: theme.space.xs}}>
                    {data?.address}
                  </CustomText>
                  <CustomText>
                    {data?.location?.coordinates?.join(',')}
                  </CustomText>
                </View>
                <ActionButton
                  onPress={() => navigation.navigate('ChangeAddress', {})}
                  roundButton
                  style={{width: 50, height: 50}}>
                  <IconComponent
                    color={'#fff'}
                    name="chevron-right"
                    iconSet="MaterialCommunityIcons"
                    size={35}
                  />
                </ActionButton>
              </View>
            </View>
            {/* <SocialButtons
              data={[
                {type: 'facebook', link: 'facebook.com'},
                {type: 'vk', link: 'vk.com'},
              ]}
            /> */}
          </View>
          <View style={styles.tagContainer}>
            {context.myProfile.profile.styles?.length ? (
              <TagList data={context.myProfile.profile.styles}></TagList>
            ) : (
              <View style={{flex: 1}}>
                <CustomText>Add your tattoo styles</CustomText>
              </View>
            )}
            <ActionButton
              onPress={() => navigation.navigate('AddTags', {})}
              roundButton
              style={{width: 50, height: 50}}>
              <IconComponent
                color={'#fff'}
                name="chevron-right"
                iconSet="MaterialCommunityIcons"
                size={35}
              />
            </ActionButton>
          </View>
          <ActionButton
            style={{
              marginTop: theme.space.s,
              marginBottom: theme.common.tabNavigationHeight + theme.space.xxxl,
              alignSelf: 'flex-end',
              width: '100%',
            }}
            roundButton
            onPress={handleSubmit(submitInfo)}
            title={'Save'}></ActionButton>
        </ScrollView>
      </BottomSheet>
    </>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  bottomSheetContainer: {
    paddingHorizontal: theme.space.xs,
    paddingVertical: theme.space.s,
  },
  tagContainer: {
    marginVertical: theme.space.xs,
    flexDirection: 'row',
    height: 71,
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 30,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  container: {
    alignSelf: 'center',
    marginVertical: theme.space.xs,
    flexDirection: 'row',
    width: '85%',
    paddingHorizontal: theme.space.xxxl,
    justifyContent: 'center',
  },
  userInfo: {
    marginLeft: theme.space.l,
  },

  followButton: {
    marginTop: theme.space.s,
    paddingVertical: theme.space.xxxs,
    paddingHorizontal: theme.space.xxs,
  },
}));

export default React.memo(MasterProfileHeader);
