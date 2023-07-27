import {View, Text} from 'react-native';
import React, {useMemo, useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {AppContext} from 'providers/AppProvider';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {schema} from './validationSchema';
import useTheme from 'hooks/useTheme';
import StyledControlledTextInput from 'components/StyledControlledTextInput';
import CustomText from 'components/CustomText';
import PressableStyled from 'components/PressableStyled';
import PhoneCodePicker from 'components/PhoneCodePicker';
import {ActionButton} from 'components/ActionButton';
import {useNavigation} from '@react-navigation/native';
import IconComponent from 'components/Basic/IconComponent';

const ProfileDataForm = ({onSave}: {onSave?: () => void}) => {
  const context = useContext(AppContext);
  const styles = makeStyles();
  const theme = useTheme();
  const navigation = useNavigation();

  const data = context.myProfile?.profile;

  const [phoneCodeModalVisible, setPhoneCodeModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    data.phoneCode || '+7',
  );

  async function submitInfo(payload: any) {
    const {email, phone, name} = payload || {};
    await context.myProfile.updateProfile({
      email,
      phone,
      name,
      phoneCode: selectedCountry,
    });

    onSave?.();
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: context.myProfile.profile.name,
      phone: context.myProfile.profile.phone,
      email: context.myProfile.profile.phone,
    },
  });

  return (
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
          containerStyle={{marginBottom: theme.space.xs}}
          staticHolder="Name"
          errorMessage={errors.email?.message || ''}
          control={control}
          name="name"
          label="Name"
        />

        <StyledControlledTextInput
          containerStyle={{marginBottom: theme.space.xs}}
          staticHolder="Email"
          errorMessage={errors.email?.message || ''}
          control={control}
          name="email"
          label="Email"
        />
        <View>
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
              alignItems: 'center',
            }}>
            <CustomText
              bold
              style={{marginBottom: theme.space.xs, width: '80%'}}>
              {data?.address}
            </CustomText>
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
  );
};

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

export default ProfileDataForm;
