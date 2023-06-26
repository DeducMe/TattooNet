import {View, Text, Pressable, Image} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import Gravatar from 'components/Gravatar';

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
  const [favorite, setFavorite] = useState(false);
  const [phoneCodeModalVisible, setPhoneCodeModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>('+7');

  // useEffect(() => {
  //   if (modalizeRef.current) {
  //     modalizeRef.current?.open();
  //   }
  // }, [modalizeRef.current]);

  function loadAvatar() {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response && response.assets && response.assets[0]) {
        const usrphoto = response.assets[0];
        const avatar = await createFormData(usrphoto);
        if (!avatar) return;

        context.profile.updateAvatar({
          avatar,
        });
      }
    });
  }

  function editInfo() {
    editableModalizeRef.current?.open();
  }

  function submitInfo(payload: any) {
    const {email, phone, name} = payload || {};
    context.profile.updateProfile({
      email,
      phone,
      name,
    });
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(masterEditable),
  });

  console.log(context.profile?.profile.location, 'LOCATION');

  return (
    <>
      <View style={styles.container}>
        <PressableStyled
          disabled={!editable}
          style={{justifyContent: 'center'}}
          onPress={() => {
            editable && loadAvatar();
          }}>
          <Gravatar
            sourceUri={context.profile?.profile?.avatar}
            style={styles.avatar}
            options={{
              email: 'example@gmail.com',
              parameters: {size: '300', d: 'mm'},
              secure: true,
            }}
          />
        </PressableStyled>
        <View style={styles.userInfo}>
          <CustomText h1>{context.profile.profile?.name}</CustomText>
          <CustomText>{context.profile.profile?.address}</CustomText>

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
        {!editable && (
          <PressableStyled
            onPress={() => {
              setFavorite(!favorite);
            }}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}>
            <IconComponent
              iconSet="AntDesign"
              name={favorite ? 'heart' : 'hearto'}
              color={theme.colors.error}
              size={30}
            />
          </PressableStyled>
        )}
      </View>
      <BottomSheet modalizeRef={modalizeRef}>
        <View style={styles.bottomSheetContainer}>
          <PressableStyled>
            <CustomText>phone number</CustomText>
          </PressableStyled>
          {/* <SocialButtons
            data={[
              {type: 'facebook', link: 'facebook.com'},
              {type: 'vk', link: 'vk.com'},
            ]}
          /> */}
        </View>
      </BottomSheet>

      <BottomSheet modalHeight={500} modalizeRef={editableModalizeRef}>
        <View
          style={[
            styles.bottomSheetContainer,
            {height: 500, justifyContent: 'space-between'},
          ]}>
          <View
            style={{
              marginTop: theme.space.xs,
            }}>
            <StyledControlledTextInput
              defaultValue={context.profile.profile?.name}
              containerStyle={{marginBottom: theme.space.xs}}
              staticHolder="Name"
              errorMessage={errors.email?.message || ''}
              control={control}
              name="name"
              label="Name"
            />

            <StyledControlledTextInput
              defaultValue={context.profile.profile?.email}
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
                  defaultValue={context.profile.profile?.phone}
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
                    {context.profile.profile?.address}
                  </CustomText>
                  <CustomText>
                    {context.profile.profile?.location?.coordinates?.join(',')}
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

          <ActionButton
            style={{
              marginBottom: theme.common.tabNavigationHeight + theme.space.xxxl,
              alignSelf: 'flex-end',
              width: '100%',
            }}
            roundButton
            onPress={handleSubmit(submitInfo)}
            title={'Save'}></ActionButton>
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
