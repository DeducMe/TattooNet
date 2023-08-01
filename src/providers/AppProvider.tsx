import useAuth, {Token} from 'hooks/providerHooks/useAuth';
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
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
import useProfile from 'hooks/providerHooks/useProfile';
import useTattoos from 'hooks/providerHooks/useTattoos';
import useReviews, {Review} from 'hooks/providerHooks/useReviews';
import {MainContext} from './MainProvider';
import useMaster from 'hooks/providerHooks/useMaster';
import {ImageOrVideo} from 'react-native-image-crop-picker';

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
    toggleStyle: (name: string) => void;
    getMe: () => void;
    sendEmail: (email: string, text: string) => void;
    updateAvatar: ({avatar}: {avatar: string}) => void;
    updateProfile: ({
      email,
      phone,
      name,
      phoneCode,
    }: {
      email: string;
      phone: string;
      name: string;
      phoneCode: string;
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

  favorites: {
    addFavorite: ({type, item}: {type: 'master' | 'tattoo'; item: any}) => void;
    removeFavorite: ({
      type,
      id,
    }: {
      type: 'master' | 'tattoo';
      id: string;
    }) => void;
    getFavorites: () => void;
    favorites: any[];
  };

  tattoos: {
    getTattoos: ({id}: {id: string}) => void;
    getMyTattoos: ({id}: {id: string}) => void;
    nullifyTattoos: () => void;

    loading: {
      tattoos: boolean;
    };
    myTattoos: {available: any[]; portfolio: any[]};
    tattoos: {available: any[]; portfolio: any[]};
  };

  reviews: {
    getReviews: ({id}: {id: string}) => void;
    getMyReviews: ({id}: {id: string}) => void;
    nullifyReviews: () => void;

    reviews: Review[];
    myReviews: Review[];

    loading: {
      reviews: boolean;
    };
  };

  master: {
    getMaster: ({id}: {id: string}) => void;
    nullifyMaster: () => void;
    loading: {
      master: boolean;
    };
    master: any;
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

const AppContextInitialValue = {
  myProfile: {
    getMe: () => {},
    sendEmail: () => {},
    updateProfile: () => {},
    updateAvatar: () => {},
    updateAddress: () => {},
    toggleStyle: () => {},
    loading: false,
    profile: null,
  },
  feed: {getFeed: () => {}, feed: [], loading: false},

  favorites: {
    addFavorite: () => {},
    removeFavorite: () => {},
    getFavorites: () => {},
    favorites: [],
  },

  profile: {
    getUsers: ({query, page, limit}) => {},
    loading: {
      users: false,
    },
    users: [],
  },
  tattoos: {
    getTattoos: () => {},
    getMyTattoos: () => {},
    nullifyTattoos: () => {},

    loading: {
      tattoos: false,
    },
    tattoos: {available: [], portfolio: []},
    myTattoos: {available: [], portfolio: []},
  },

  reviews: {
    getReviews: () => {},
    getMyReviews: () => {},
    nullifyReviews: () => {},
    reviews: [],
    myReviews: [],

    loading: {
      reviews: false,
    },
  },

  master: {
    getMaster: () => {},
    nullifyMaster: () => {},
    loading: {
      master: false,
    },
    master: {},
  },
};

export const AppContext = React.createContext<AppContextT>(
  AppContextInitialValue,
);

const {Provider} = AppContext;

export const AppProvider = props => {
  const mainContext = useContext(MainContext);
  const providerValue = {
    profile: useProfile(),
    myProfile: useMyProfile(),
    feed: useFeed(),
    favorites: useFavorites(),
    master: useMaster(),
    reviews: useReviews(),
    tattoos: useTattoos(),
  };

  return <Provider value={providerValue}>{props.children}</Provider>;
};
