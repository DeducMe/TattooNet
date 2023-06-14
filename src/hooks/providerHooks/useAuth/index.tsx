import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiRequest} from 'common/config';
import {AppContext} from 'providers/AppProvider';
import {useContext, useEffect, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export type Token = string;

export default function useAuth(props?: {tokenProp?: Token}) {
  const context = useContext(AppContext);
  const [token, setToken] = useState<Token>();
  const [loading, setLoading] = useState(false);

  async function register(payload) {
    setLoading(true);

    const {name, email, password} = payload;
    const reg = await apiRequestContainer({
      call: 'user/register',
      method: 'POST',
      body: {
        name,
        login: email,
        password,
      },
    });
    setLoading(false);

    if (!reg.token) {
      return context.toast.showError(
        reg.message || 'Unprocessed register error',
        !reg.message
          ? 'Please contact our support and give us all your details'
          : '',
      );
    }
    setToken(reg.token);
    await AsyncStorage.setItem('token', reg.token);
  }

  async function login(payload) {
    setLoading(true);

    const {email, password} = payload;
    const auth = await apiRequestContainer({
      call: 'user/login',
      method: 'POST',
      body: {
        login: email,
        password,
      },
    });
    setLoading(false);

    if (!auth.token) {
      return context.toast.showError(
        auth.message || 'Unprocessed login error',
        !auth.message
          ? 'Please contact our support and give us all your details'
          : '',
      );
    }
    setToken(auth.token);
    await AsyncStorage.setItem('token', auth.token);
  }

  useEffect(() => {
    async function start() {
      const storageToke = await AsyncStorage.getItem('token');
      // TODO check for token validity with some request
      if (storageToke) {
        setToken(storageToke);
      }
    }
    start();
  }, []);

  async function apiRequestContainer({
    call,
    method,
    body,
  }: {
    call: string;
    method: string;
    body: object;
  }) {
    const response = await apiRequest(call, method, body, 'test');
    console.log(response, 'sdkjldklfskdjlf');

    return response;

    // TODO check for response code here and re-request or navigate to login screen
  }

  return {token, login, register, loading, apiRequestContainer};
}
