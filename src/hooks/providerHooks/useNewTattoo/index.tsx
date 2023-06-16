import {AppContext, AppContextT} from 'providers/AppProvider';
import {useContext, useState} from 'react';

export default function useNewTatto() {
  const context = useContext(AppContext);
  const [newTattoo, setNewTattoo] = useState<
    AppContextT['newTattoo']['newTattoo']
  >({
    name: '',
    images: [],
    type: 'completed',
  });

  async function save() {
    const response = await context.auth.apiRequestContainer({
      call: 'tattoo',
      method: 'POST',
      body: {...(newTattoo || {})},
    });

    nullify();
  }

  function nullify() {
    setNewTattoo({
      name: '',
      images: [],
      type: 'completed',
    });
  }

  function update({
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
    setNewTattoo({
      ...newTattoo,
      type: type || 'completed',
      name,
      price,
      currency,
      description,
    });
  }
  function addImage(image: string) {
    setNewTattoo({
      ...newTattoo,
      images: newTattoo?.images.concat([image]),
    });
  }
  function deleteImage(index: number) {
    setNewTattoo({
      ...newTattoo,
      images: newTattoo?.images.filter((item, i) => i !== index),
    });
  }

  return {addImage, update, save, deleteImage, nullify, newTattoo};
}
