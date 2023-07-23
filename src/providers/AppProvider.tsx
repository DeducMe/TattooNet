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

export interface AppPostContextT {
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
      masterId,
    }: {
      reviewText: string;
      _id: string;
      userProfileId: string;
      images: string[];
      starRating: number;
      masterId: string;
    }) => void;
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
}

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

  favorites: {
    addFavorite: ({type, id}: {type: 'master' | 'tattoo'; id: string}) => void;
    removeFavorite: ({id}: {id: string}) => void;
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

export const AppPostContextProvider = React.createContext<AppPostContextT>({
  tattoo: {
    getTattoo: () => {},
    nullifyTattoo: () => {},
    tattoo: null,
    submitTattoo: () => {},
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
});

const {Provider} = AppContext;
const {Provider: PostProvider} = AppPostContextProvider;

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

  const postProviderValue = {
    newTattoo: useNewTatto(),
    tattoo: useTattoo(),
  };

  return (
    <Provider value={providerValue}>
      <PostProvider value={postProviderValue}>{props.children}</PostProvider>
    </Provider>
  );
};
