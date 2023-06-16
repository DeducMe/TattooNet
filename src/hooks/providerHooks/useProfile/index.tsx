import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from 'providers/AppProvider';
import {useContext, useState} from 'react';

export default function useProfile() {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  async function sendEmail(email: string, text: string) {
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'master/mail_request',
      method: 'GET',
      body: {email, text},
    });

    AsyncStorage.setItem('emailSend', email);
    setLoading(false);
  }

  async function getMe() {
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'profile/me',
      method: 'GET',
      body: {},
    });

    setLoading(false);
    setProfile(response.profile);
  }

  async function updateAvatar({avatar}) {
    console.log(avatar, 'sdlkdslk');
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'profile',
      method: 'PUT',
      body: {
        avatar,
      },
    });

    setLoading(false);
    setProfile({
      ...(profile || {}),
      avatar: 'data:image/jpeg;base64,' + avatar,
    });
  }

  async function updateProfile({email, name, phone, address}) {
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'profile',
      method: 'PUT',
      body: {
        email,
        name,
        phone,
        address,
      },
    });

    setLoading(false);
    setProfile({...(profile || {}), email, name, phone, address});
  }

  return {sendEmail, getMe, updateProfile, updateAvatar, loading, profile};
}
