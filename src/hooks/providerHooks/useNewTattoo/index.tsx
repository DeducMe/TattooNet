import useStateWithCallback from 'hooks/useStateWithCallback';
import {AppContext, AppContextT} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {SetStateAction, useContext, useState} from 'react';

export default function useNewTatto() {
  const context = useContext(MainContext);

  const [newTattoo, setNewTattoo] = useStateWithCallback<
    AppContextT['newTattoo']['newTattoo']
  >({
    name: '',
    images: [],
    type: 'completed',
  });
  const [loading, setLoading] = useState(false);

  function nullify() {
    setNewTattoo(
      {
        name: '',
        images: [],
        type: 'completed',
      },
      () => {},
    );
  }

  function updateAndSave({
    name,
    price,
    currency,
    description,
    type,
  }: {
    name: string;
    price?: number;
    currency?: string;
    description?: string;
    type?: string;
  }) {
    setLoading(true);
    console.log(
      {name, price, currency, description, type},
      ' ------------ Time to update',
    );
    setNewTattoo(
      {
        ...newTattoo,
        type: type || 'completed',
        name,
        price,
        currency,
        description,
      },
      newTattoo => {
        context.auth
          .apiRequestContainer({
            call: 'tattoos',
            method: 'POST',
            body: newTattoo,
          })
          .then(response => {
            if (response.success) nullify();
            setLoading(false);

            context.navigation?.goBack();
          });
      },
    );
  }
  function addImage(image: string) {
    setNewTattoo(
      {
        ...newTattoo,
        images: newTattoo?.images.concat([image]),
      },
      () => {},
    );
  }
  function deleteImage(index: number) {
    setNewTattoo(
      {
        ...newTattoo,
        images: newTattoo?.images.filter((item, i) => i !== index),
      },
      () => {},
    );
  }

  return {addImage, updateAndSave, deleteImage, nullify, newTattoo, loading};
}
