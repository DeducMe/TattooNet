import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiRequest} from 'common/api';
import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useContext, useEffect, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export type Token = string;

export default function useAuth(props?: {tokenProp?: Token}) {
  const context = useContext(MainContext);
  const [token, setToken] = useState<Token>();
  const [loading, setLoading] = useState(false);

  async function register(payload) {
    setLoading(true);

    const {name, email, password} = payload;
    const {data: reg} = await apiRequestContainer({
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
    await AsyncStorage.setItem('token', reg.token);

    setToken(reg.token);
  }

  async function login(payload) {
    setLoading(true);

    const {email, password} = payload;
    const {data: auth} = await apiRequestContainer({
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
    await AsyncStorage.setItem('token', auth.token);

    setToken(auth.token);
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

  async function logout() {
    await AsyncStorage.setItem('token', '');
    setToken(undefined);
  }

  async function apiRequestContainer({
    call,
    method,
    body,
    headers,
    noStringify,
  }: {
    call: string;
    method: string;
    body?: object;
    headers?: object;
    noStringify?: boolean;
  }) {
    let response;
    const asyncToken = await AsyncStorage.getItem('token');
    console.log(asyncToken, 'asyncToken');
    try {
      response = await apiRequest(
        call,
        method,
        body,
        headers,
        asyncToken,
        noStringify,
      );
    } catch ({message}: any) {
      context.toast.showError(message || `Api error in ${call}`);
      console.log(message, 'API ERROR CHECK in ', call);
    }

    if (response?.token === false) await AsyncStorage.setItem('token', '');

    return response;
  }

  return {token, login, register, logout, loading, apiRequestContainer};
}
