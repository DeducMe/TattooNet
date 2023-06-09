import {useEffect, useState} from 'react';

export type Token = string;

export default function useAuth(props?: {tokenProp?: Token}) {
  const {tokenProp} = props || {};
  const [token, setToken] = useState<Token>();

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [token]);

  return {token, setToken};
}
