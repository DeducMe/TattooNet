import {apiRequest} from 'common/config';
import {useEffect, useState} from 'react';

export type Token = string;

export default function useAuth(props?: {tokenProp?: Token}) {
  const {tokenProp} = props || {};
  const [token, setToken] = useState<Token>();

  async function register(payload) {
    const {name, email, password} = payload;
    const reg = await apiRequest('user/register', 'POST', {
      name,
      login: email,
      password,
    });
    console.log(reg);
    setToken(reg.token);
  }

  async function login(payload) {
    const {email, password} = payload;
    const auth = await apiRequest('user/login', 'POST', {
      login: email,
      password,
    });
    setToken(auth.token);
  }

  useEffect(() => {
    console.log(token, 'sdlkdslkdslk');
    if (token) {
      setToken(token);
    }
  }, [token]);

  return {token, login, register};
}
