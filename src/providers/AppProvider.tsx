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
      body: object;
    }) => any;
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

  profile: {
    getMe: () => void;
    sendEmail: (email: string, text: string) => void;
    updateAvatar: ({avatar}: {avatar: string}) => void;
    updateProfile: ({
      email,
      phone,
      address,
      name,
    }: {
      email: string;
      phone: string;
      address: string;
      name: string;
    }) => void;
    loading: boolean;
    profile: any;
  };
  feed: {getFeed: () => void; feed: any};
  tattoo: {
    getTattoo: ({id}: {id: string}) => void;
    nullifyTattoo: () => void;
    tattoo: any;
  };
  favorites: {
    addFavorite: ({type, id}: {type: 'master' | 'tattoo'; id: string}) => void;
    removeFavorite: ({id}: {id: string}) => void;
    getFavorites: () => void;
    favorites: any[];
  };
  newTattoo: {
    addImage: (image: string) => void;
    update: ({
      name,
      price,
      description,
      currency,
    }: {
      name: string;
      price?: number;
      currency?: string;
      description?: string;
    }) => void;
    save: () => void;
    nullify: () => void;
    deleteImage: (index: number) => void;
    newTattoo: {
      name: string;
      images: string[];
      type: string;
      price?: number;
      currency?: string;
      description?: string;
    };
  };
}

export const AppContext = React.createContext<AppContextT>({
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
  currency: {currency: []},
  languages: {languages: [], setLocale: token => {}},

  profile: {
    getMe: () => {},
    sendEmail: () => {},
    updateProfile: () => {},
    updateAvatar: () => {},

    loading: false,
    profile: null,
  },
  feed: {getFeed: () => {}, feed: null},
  tattoo: {
    getTattoo: () => {},
    nullifyTattoo: () => {},
    tattoo: null,
  },
  favorites: {
    addFavorite: () => {},
    removeFavorite: () => {},
    getFavorites: () => {},
    favorites: [],
  },
  newTattoo: {
    addImage: () => {},
    update: () => {},
    save: () => {},
    nullify: () => {},
    deleteImage: () => {},
    newTattoo: {
      name: '',
      images: [],
      type: 'new',
    },
  },
});

const {Provider} = AppContext;

export const AppProvider = props => {
  const currency = useCurrency();
  const languages = useLanguages();
  const toast = useToast();
  const auth = useAuth();

  const profile = useProfile();
  const feed = useFeed();
  const tattoo = useTattoo();
  const favorites = useFavorites();
  const newTattoo = useNewTatto();

  return (
    <Provider
      value={{
        auth,
        currency,
        languages,
        toast,
        profile,
        feed,
        tattoo,
        favorites,
        newTattoo,
      }}>
      {props.children}
    </Provider>
  );
};
