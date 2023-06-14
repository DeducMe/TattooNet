import {AppContext} from 'providers/AppProvider';
import {useContext, useState} from 'react';

export default function useFavorites() {
  const context = useContext(AppContext);
  const [favorites, setFavorites] = useState<any[]>([]);
  function addFavorite({type, id}: {type: 'master' | 'tattoo'; id: string}) {
    context.auth.apiRequestContainer({
      call: 'favorites/add',
      method: 'POST',
      body: {type, id},
    });
  }
  function removeFavorite({id}: {id: string}) {
    context.auth.apiRequestContainer({
      call: 'favorites/remove',
      method: 'POST',
      body: {id},
    });
    setFavorites(favorites.filter(item => item.id !== id));
  }

  async function getFavorites() {
    const response = await context.auth.apiRequestContainer({
      call: 'favorites',
      method: 'GET',
      body: {},
    });

    setFavorites(response.favorites);
  }

  return {addFavorite, removeFavorite, getFavorites};
}
