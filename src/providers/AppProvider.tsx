import useAuth, {Token} from 'hooks/providerHooks/useAuth';
import React, {Dispatch, SetStateAction, useState} from 'react';
import useCurrency from 'hooks/providerHooks/useCurrency';
import useLanguages, {
  Country,
  Language,
} from 'hooks/providerHooks/useLanguages.tsx';

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
  };

  currency: {
    currency: CurrencyT[] | undefined;
  };
  languages: {
    setLocale: Dispatch<SetStateAction<Language>>;
    languages: Country[];
  };
};

export const AppContext = React.createContext<AppContextT>({
  auth: {
    token: undefined,
    login: (payload: {email; password}) => {},
    register: (payload: {name; email; password}) => {},
  },
  currency: {currency: []},
  languages: {languages: [], setLocale: token => {}},
});

const {Provider} = AppContext;

export const AppProvider = props => {
  const auth = useAuth();
  const currency = useCurrency();
  const languages = useLanguages();

  return (
    <Provider
      value={{
        auth,
        currency,
        languages,
      }}>
      {props.children}
    </Provider>
  );
};
