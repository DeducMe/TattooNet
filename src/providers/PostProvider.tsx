import useNewTatto from 'hooks/providerHooks/useNewTattoo';
import useTattoo from 'hooks/providerHooks/useTattoo';
import React from 'react';
import {ImageOrVideo} from 'react-native-image-crop-picker';
export interface AppPostContextT {
  tattoo: {
    getTattoo: ({id}: {id: string}) => void;
    nullifyTattoo: () => void;
    tattoo: any;
    submitTattoo: ({
      reviewText,
      _id,
      images,
      starRating,
      masterId,
    }: {
      reviewText: string;
      _id: string;
      images: ImageOrVideo[];
      starRating: number;
      masterId: string;
    }) => void;
  };
  newTattoo: {
    addImage: (image: ImageOrVideo) => void;
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

const {Provider} = AppPostContextProvider;

export const PostProvider = props => {
  const postProviderValue = {
    newTattoo: useNewTatto(),
    tattoo: useTattoo(),
  };

  return <Provider value={postProviderValue}>{props.children}</Provider>;
};
