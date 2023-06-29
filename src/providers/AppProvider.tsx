import useAuth, {Token} from 'hooks/providerHooks/useAuth';
import React, {Dispatch, SetStateAction, useState} from 'react';
import useCurrency from 'hooks/providerHooks/useCurrency';
import useLanguages, {
  Country,
  Language,
} from 'hooks/providerHooks/useLanguages.tsx';
import useToast from 'hooks/providerHooks/useToast';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import useMyProfile from 'hooks/providerHooks/useMyProfile';
import useFeed from 'hooks/providerHooks/useFeed';
import useTattoo from 'hooks/providerHooks/useTattoo';
import useFavorites from 'hooks/providerHooks/useFavorites';
import useNewTatto from 'hooks/providerHooks/useNewTattoo';
import useMaster from 'hooks/providerHooks/useMaster';
import useCountry from 'hooks/providerHooks/useCountry';
import useProfile from 'hooks/providerHooks/useProfile';

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
  myProfile: {
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
  feed: {getFeed: () => void; feed: any[]; loading: boolean};
  tattoo: {
    getTattoo: ({id}: {id: string}) => void;
    nullifyTattoo: () => void;
    tattoo: any;
    submitTattoo: ({
      reviewText,
      _id,
      userProfileId,
      images,
      starRating,
    }: {
      reviewText: string;
      _id: string;
      userProfileId: string;
      images: string[];
      starRating: number;
    }) => void;
  };
  favorites: {
    addFavorite: ({type, id}: {type: 'master' | 'tattoo'; id: string}) => void;
    removeFavorite: ({id}: {id: string}) => void;
    getFavorites: () => void;
    favorites: any[];
  };
  newTattoo: {
    addImage: (image: string) => void;
    updateAndSave: ({
      name,
      price,
      description,
      currency,
      type,
    }: {
      name: string;
      price?: number;
      currency?: string;
      description?: string;
      type?: 'completed' | 'available';
    }) => void;
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
    loading: boolean;
  };
  master: {
    getMaster: ({id}: {id: string}) => void;
    getTattoos: ({id}: {id: string}) => void;
    getMyTattoos: ({id}: {id: string}) => void;
    getReviews: ({id}: {id: string}) => void;
    getMyReviews: ({id}: {id: string}) => void;
    nullifyMaster: () => void;
    loading: {
      master: boolean;
      tattoos: boolean;
      myTattoos: boolean;
      reviews: boolean;
    };
    master: any;
    reviews: any[];
    myReviews: any[];
    myTattoos: {available: any[]; portfolio: any[]};
    tattoos: {available: any[]; portfolio: any[]};
  };
  profile: {
    getUsers: ({
      query,
      page,
      limit,
    }: {
      query: string;
      page: number;
      limit: number;
    }) => void;
    loading: {
      users: boolean;
    };
    users: any;
  };
}

export const AppContext = React.createContext<AppContextT>({
  myProfile: {
    getMe: () => {},
    sendEmail: () => {},
    updateProfile: () => {},
    updateAvatar: () => {},
    updateAddress: () => {},
    loading: false,
    profile: null,
  },
  feed: {getFeed: () => {}, feed: [], loading: false},
  tattoo: {
    getTattoo: () => {},
    nullifyTattoo: () => {},
    tattoo: null,
    submitTattoo: () => {},
  },
  favorites: {
    addFavorite: () => {},
    removeFavorite: () => {},
    getFavorites: () => {},
    favorites: [],
  },
  newTattoo: {
    addImage: () => {},
    updateAndSave: () => {},
    nullify: () => {},
    deleteImage: () => {},
    newTattoo: {
      name: '',
      images: [],
      type: 'new',
    },
    loading: false,
  },
  profile: {
    getUsers: ({query, page, limit}) => {},
    loading: {
      users: false,
    },
    users: [],
  },
  master: {
    getMaster: () => {},
    getTattoos: () => {},
    getMyTattoos: () => {},
    nullifyMaster: () => {},
    getReviews: () => {},
    getMyReviews: () => {},
    reviews: [],
    myReviews: [],

    loading: {
      master: false,
      tattoos: false,
      myTattoos: false,
      reviews: false,
    },
    master: {},
    tattoos: {available: [], portfolio: []},
    myTattoos: {available: [], portfolio: []},
  },
});

const {Provider} = AppContext;

export const AppProvider = props => {
  const myProfile = useMyProfile();
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
        myProfile,
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
