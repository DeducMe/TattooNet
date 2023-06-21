import useAuth, {Token} from 'hooks/providerHooks/useAuth';
import React, {Dispatch, SetStateAction, useState} from 'react';
import useCurrency from 'hooks/providerHooks/useCurrency';
import useLanguages, {
  Country,
  Language,
} from 'hooks/providerHooks/useLanguages.tsx';
import useToast from 'hooks/providerHooks/useToast';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import useProfile from 'hooks/providerHooks/useProfile';
import useFeed from 'hooks/providerHooks/useFeed';
import useTattoo from 'hooks/providerHooks/useTattoo';
import useFavorites from 'hooks/providerHooks/useFavorites';
import useNewTatto from 'hooks/providerHooks/useNewTattoo';
import useMaster from 'hooks/providerHooks/useMaster';
import useCountry from 'hooks/providerHooks/useCountry';
import {CityT, CountryT} from './AppProvider';

export type CurrencyT = {
  _id: string;
  name: string;
  sysname: string;
  symbol: string;
};

export interface AppContextT {
  auth: {
    token: Token | undefined;
    login: (payload: {email; password}) => void;
    register: (payload: {name; email; password}) => void;
    loading: boolean;
    apiRequestContainer: (payload: {
      call: string;
      method: string;
      body?: object;
    }) => any;
  };
  country: {
    country: CountryT[];
    city: CityT[];
    setCountryChosenId: Dispatch<SetStateAction<string | null>>;
    setCityChosenId: Dispatch<SetStateAction<string | null>>;
    countryChosenId: string | null;
    cityChosenId: string | null;
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
}

export const MainContext = React.createContext<AppContextT>({
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

  auth: {
    token: undefined,
    login: (payload: {email; password}) => {},
    register: (payload: {name; email; password}) => {},
    loading: false,
    apiRequestContainer: () => {},
  },
  country: {
    country: [],
    city: [],
    setCountryChosenId: () => {},
    setCityChosenId: () => {},
    countryChosenId: null,
    cityChosenId: null,
  },
  currency: {currency: []},
  languages: {languages: [], setLocale: token => {}},
});

const {Provider} = MainContext;

export const MainProvider = props => {
  const currency = useCurrency();

  const languages = useLanguages();

  const toast = useToast();
  const auth = useAuth();
  const country = useCountry();

  return (
    <Provider
      value={{
        auth,
        currency,
        languages,
        toast,
        country,
      }}>
      {props.children}
    </Provider>
  );
};
