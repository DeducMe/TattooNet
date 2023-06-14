import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from 'providers/AppProvider';
import {useContext, useState} from 'react';

export default function useProfile() {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  async function sendEmail(email: string) {
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'master/mail_request',
      method: 'GET',
      body: {email},
    });

    AsyncStorage.setItem('emailSend', email);
    setLoading(false);
  }

  return {sendEmail, loading};
}
