import {AppContext} from 'providers/AppProvider';
import {CurrencyT, MainContext} from 'providers/MainProvider';
import {useContext, useEffect, useMemo, useState} from 'react';
import {Review} from '../useMaster';
import {makeImagesFromResponseBase64} from 'common/function';

export type Tattoo = {
  _id: string;
  images: string[];
  name: string;
  price: number;
  reviews: Review[];
  currency: CurrencyT;
  description?: string;
  masterProfile: {name: string; _id: string};
};

export type MasterTattos = {
  available: Tattoo[];
  portfolio: Tattoo[];
};

export default function useTattoos() {
  const initialTattoos: MasterTattos = {available: [], portfolio: []};
  const context = useContext(MainContext);
  const [loading, setLoading] = useState({
    tattoos: false,
  });

  const [tattoos, setTattoos] = useState(initialTattoos);
  const [myTattoos, setMyTattoos] = useState(initialTattoos);
  useEffect(() => {
    console.log(loading, 'USE_EFFECT');
  }, [loading]);

  async function getTattoos({id}: {id: string}) {
    setLoading({...loading, tattoos: true});
    const response = await context.auth.apiRequestContainer({
      call: 'tattoos/master',
      method: 'POST',
      body: {id},
    });

    console.log(response);

    if (response.success) {
      const result = response.data.tattoos;

      const available = result.available.map(item => {
        if (item.images[0]?.imageObject?.[0]?.data?.data)
          item.images = makeImagesFromResponseBase64(item.images, true);
        return item;
      });

      const portfolio = result.portfolio.map(item => {
        if (item.images[0]?.imageObject?.[0]?.data?.data)
          item.images = makeImagesFromResponseBase64(item.images, true);
        return item;
      });

      result.available = available;
      result.portfolio = portfolio;

      setTattoos(result);
    }

    setLoading({...loading, tattoos: false});
  }

  async function getMyTattoos({id}: {id: string}) {
    setLoading({...loading, tattoos: true});

    const response = await context.auth.apiRequestContainer({
      call: 'tattoos/master',
      method: 'POST',
      body: {id},
    });
    if (response.success) {
      const result = response.data.tattoos;

      const available = result.available.map(item => {
        if (item.images[0]?.imageObject?.[0]?.data?.data)
          item.images = makeImagesFromResponseBase64(item.images, true);
        return item;
      });

      const portfolio = result.portfolio.map(item => {
        if (item.images[0]?.imageObject?.[0]?.data?.data)
          item.images = makeImagesFromResponseBase64(item.images, true);
        return item;
      });

      result.available = available;
      result.portfolio = portfolio;

      setMyTattoos(result);
    }

    setLoading({...loading, tattoos: false});
  }

  function nullifyTattoos() {
    setTattoos(initialTattoos);
  }

  return {
    getTattoos,
    getMyTattoos,
    nullifyTattoos,
    loading,
    myTattoos,
    tattoos,
  };
}
