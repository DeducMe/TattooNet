import {makeImagesFromResponseBase64} from 'common/function';
import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export default function useFavorites() {
  const context = useContext(MainContext);
  const [favorites, setFavorites] = useState<any[]>([]);
  function addFavorite({type, item}: {type: 'master' | 'tattoo'; item: any}) {
    context.auth.apiRequestContainer({
      call: 'favorites',
      method: 'POST',
      body: {type, [type]: item._id},
    });
    console.log(addFavorite);
    setFavorites([...favorites, {[type]: item}]);
  }

  function removeFavorite({type, id}: {type: 'master' | 'tattoo'; id: string}) {
    console.log('removeFavorite');
    context.auth.apiRequestContainer({
      call: 'favorites',
      method: 'DELETE',
      body: {_id: id},
    });
    setFavorites(favorites.filter(item => item[type]?._id !== id));
  }

  async function getFavorites() {
    const response = await context.auth.apiRequestContainer({
      call: 'favorites',
      method: 'GET',
    });

    console.log(response.data.favorites, 'getFavorites');

    const result = response.data.favorites.map(item => {
      if (!item?.master) return item;
      if (item.master.avatar?.imageObject?.[0]?.data?.data)
        item.master.avatar = makeImagesFromResponseBase64(
          item.master.avatar,
          false,
        );

      return item;
    });

    setFavorites(result);
  }

  return {addFavorite, removeFavorite, getFavorites, favorites};
}
