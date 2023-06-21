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

export type CurrencyT = {
  _id: string;
  name: string;
  sysname: string;
  symbol: string;
};

export type CountryT = {
  _id: string;
  name: string;
  ISO: string;
  code: string;
  emoji: string;
  unicode: string;
  image: string;
  dial_code: string;
};

export type CityT = {
  _id: string;
  name: string;
  country: CountryT;
};

export interface AppContextT {
  profile: {
    getMe: () => void;
    sendEmail: (email: string, text: string) => void;
    updateAvatar: ({avatar}: {avatar: string}) => void;
    updateProfile: ({
      email,
      phone,
      name,
    }: {
      email: string;
      phone: string;
      name: string;
    }) => void;
    updateAddress: ({
      address,
      location,
    }: {
      address: string;
      location: {longitude: number; latitude: number};
    }) => void;
    loading: boolean;
    profile: any;
  };
  feed: {getFeed: () => void; feed: any; loading: boolean};
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
  master: {
    getMaster: ({id}: {id: string}) => void;
    getTattoos: ({id}: {id: string}) => void;
    nullifyMaster: () => void;
    master: any;
    tattoos: {available: any[]; portfolio: any[]};
  };
}

export const AppContext = React.createContext<AppContextT>({
  profile: {
    getMe: () => {},
    sendEmail: () => {},
    updateProfile: () => {},
    updateAvatar: () => {},
    updateAddress: () => {},
    loading: false,
    profile: null,
  },
  feed: {getFeed: () => {}, feed: null, loading: false},
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
  master: {
    getMaster: () => {},
    getTattoos: () => {},
    nullifyMaster: () => {},
    master: {},
    tattoos: {available: [], portfolio: []},
  },
});

const {Provider} = AppContext;

export const AppProvider = props => {
  const profile = useProfile();
  const feed = useFeed();
  const tattoo = useTattoo();
  const favorites = useFavorites();
  const newTattoo = useNewTatto();
  const master = useMaster();
  return (
    <Provider
      value={{
        profile,
        feed,
        tattoo,
        favorites,
        newTattoo,
        master,
      }}>
      {props.children}
    </Provider>
  );
};
