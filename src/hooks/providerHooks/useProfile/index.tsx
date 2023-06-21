import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export default function useProfile() {
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

    if (!response.success) return context.toast.showError('get profile error');

    setLoading(false);
    setProfile(response.data.profile);
  }

  async function updateAddress({address, location}) {
    setLoading(true);
    try {
      await context.auth.apiRequestContainer({
        call: 'profile',
        method: 'PUT',
        body: {
          address,
          location: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude],
          },
        },
      });
    } catch {
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
    let a;
    try {
      a = await context.auth.apiRequestContainer({
        call: 'profile',
        method: 'PUT',
        body: {
          avatar: 'data:image/jpeg;base64,' + avatar,
        },
      });
    } catch {
      setLoading(false);
    }
    console.log(a);
    setLoading(false);
    setProfile({
      ...(profile || {}),
      avatar: 'data:image/jpeg;base64,' + avatar,
    });
  }

  async function updateProfile({email, name, phone}) {
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'profile',
      method: 'PUT',
      body: {
        email,
        name,
        phone,
      },
    });

    setLoading(false);
    setProfile({...(profile || {}), email, name, phone});
  }

  return {
    sendEmail,
    getMe,
    updateProfile,
    updateAvatar,
    updateAddress,
    loading,
    profile,
  };
}
