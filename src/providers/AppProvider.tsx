import useAuth, {Token} from 'hooks/providerHooks/useAuth';
import React, {Dispatch, SetStateAction, useState} from 'react';
import useCurrency from 'hooks/providerHooks/useCurrency';
import useLanguages, {
  Country,
  Language,
} from 'hooks/providerHooks/useLanguages.tsx';
import useToast from 'hooks/providerHooks/useToast';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export type CurrencyT = {
  _id: string;
  name: string;
  sysname: string;
  symbol: string;
};

type AppContextT = {
  auth: {
    token: Token | undefined;
    login: (payload: {email; password}) => void;
    register: (payload: {name; email; password}) => void;
    loading: boolean;
  };

  currency: {
    currency: CurrencyT[] | undefined;
  };
  languages: {
    setLocale: Dispatch<SetStateAction<Language>>;
    languages: Country[];
  };
  toast: {
    showError: (message: string, supMessage?: string) => void;
    showSuccess: (message: string, supMessage?: string) => void;
  };
};

export const AppContext = React.createContext<AppContextT>({
  auth: {
    token: undefined,
    login: (payload: {email; password}) => {},
    register: (payload: {name; email; password}) => {},
    loading: false,
  },
  currency: {currency: []},
  languages: {languages: [], setLocale: token => {}},

  // dont know how to do better really
  toast: {
    showError: (message, supMessage) => {
      Toast.show({
        text1: message || 'Unprocessed error',
        text2:
          supMessage || !message
            ? 'Please contact our support and give us all your details'
            : '',
        type: 'error',
        visibilityTime: 3000,
      });
    },
    showSuccess: (message, supMessage) => {
      Toast.show({
        text1: message,
        text2: supMessage || '',
        type: 'success',
        visibilityTime: 3000,
      });
    },
  },
});

const {Provider} = AppContext;

export const AppProvider = props => {
  const currency = useCurrency();
  const languages = useLanguages();
  const toast = useToast();
  const auth = useAuth();

  return (
    <Provider
      value={{
        auth,
        currency,
        languages,
        toast,
      }}>
      {props.children}
    </Provider>
  );
};
