import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  bufferToBase64String,
  makeImagesFromResponseBase64,
} from 'common/function';
import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useCallback, useContext, useMemo, useState} from 'react';
import {Platform} from 'react-native';

export default function useMyProfile() {
  const context = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  async function sendEmail(email: string, text: string) {
    setLoading(true);
    await context.auth.apiRequestContainer({
      call: 'master/mail_request',
      method: 'POST',
      body: {email, text},
    });

    AsyncStorage.setItem('emailSend', email);
    setLoading(false);
  }

  async function getMe() {
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'profile',
      method: 'GET',
    });
    if (response.data.profile.avatar?.imageObject?.[0]?.data?.data)
      response.data.profile.avatar = makeImagesFromResponseBase64(
        response.data.profile.avatar,
        false,
      );

    if (!response.success) return context.toast.showError('get profile error');

    setProfile(response.data.profile);
    setLoading(false);
  }

  async function updateAddress({address, location}) {
    console.log({address, location});
    setLoading(true);

    console.log('updateAddress');
    try {
      const response = await context.auth.apiRequestContainer({
        call: 'profile',
        method: 'POST',
        body: {
          address,
          location: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude],
          },
        },
      });

      console.log(response);
    } catch (e) {
      console.log(e);

      return setLoading(false);
    }

    setProfile({
      ...(profile || {}),
      address,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
    });

    setLoading(false);
  }

  async function updateAvatar({avatar}) {
    setLoading(true);

    const file = {
      uri: avatar.path, // e.g. 'file:///path/to/file/image123.jpg'
      name: avatar.filename, // e.g. 'image123.jpg',
      type: avatar.mime, // e.g. 'image/jpg'
    };

    const data = new FormData();
    data.append('image', file);

    try {
      await context.auth.apiRequestContainer({
        call: 'profile',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': `multipart/form-data; `,
        },
        noStringify: true,
      });
    } catch {
      setLoading(false);
    }
    setProfile({
      ...(profile || {}),
      avatar: avatar.path,
    });
    setLoading(false);
  }

  async function updateProfile({email, name, phone, phoneCode}) {
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'profile',
      method: 'POST',
      body: {
        email,
        name,
        phone,
        phoneCode,
      },
    });

    setProfile({...(profile || {}), email, name, phone, phoneCode});
    setLoading(false);
  }

  return {
    sendEmail: useCallback(sendEmail, []),
    getMe: useCallback(getMe, []),
    updateProfile: useCallback(updateProfile, [profile]),
    updateAvatar: useCallback(updateAvatar, [profile]),
    updateAddress: useCallback(updateAddress, [profile]),
    loading: useMemo(() => loading, [loading]),
    profile: useMemo(() => profile, [profile]),
  };
}
