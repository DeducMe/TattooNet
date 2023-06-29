import {AppContext} from 'providers/AppProvider';
import {CurrencyT, MainContext} from 'providers/MainProvider';
import {useContext, useEffect, useState} from 'react';

export type Tattoo = {
  _id: string;
  images: string[];
  name: string;
  price: number;
  currency: CurrencyT;
  description?: string;
  masterProfile: {name: string; _id: string};
};

export type MasterTattos = {
  available: Tattoo[];
  portfolio: Tattoo[];
};

export default function useMaster() {
  const initialTattoos: MasterTattos = {available: [], portfolio: []};
  const context = useContext(MainContext);
  const [master, setMaster] = useState(null);
  const [loading, setLoading] = useState({
    master: false,
    tattoos: false,
    myTattoos: false,
    reviews: false,
  });

  const [tattoos, setTattoos] = useState(initialTattoos);
  const [myTattoos, setMyTattoos] = useState(initialTattoos);
  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  useEffect(() => {
    console.log(loading, 'USE_EFFECT');
  }, [loading]);

  async function getTattoos({id}: {id: string}) {
    console.log('TATTOOS LOADING');
    setLoading({...loading, tattoos: true});
    const response = await context.auth.apiRequestContainer({
      call: 'tattoos/master',
      method: 'POST',
      body: {id},
    });

    if (response.success) setTattoos(response.data.tattoos);

    setLoading({...loading, tattoos: false});
  }

  async function getMyTattoos({id}: {id: string}) {
    setLoading({...loading, tattoos: true});

    const response = await context.auth.apiRequestContainer({
      call: 'tattoos/master',
      method: 'POST',
      body: {id},
    });

    if (response.success) setMyTattoos(response.data.tattoos);

    setLoading({...loading, tattoos: false});
  }

  async function getMaster({id}: {id: string}) {
    console.log('ALO getMaster');
    setLoading({...loading, master: true});

    const response = await context.auth.apiRequestContainer({
      call: 'profile/search',
      method: 'POST',
      body: {_id: id},
    });

    console.log(response);

    if (response.success) setMaster(response.data.profile[0]);

    setLoading({...loading, master: false});
  }

  async function getReviews({id}: {id: string}) {
    console.log('ALO getMaster');
    setLoading({...loading, reviews: true});

    const response = await context.auth.apiRequestContainer({
      call: 'reviews/master',
      method: 'POST',
      body: {_id: id},
    });

    console.log(response.data.reviews?.length, 'response.data.reviews');

    if (response.success) setReviews(response.data.reviews);

    setLoading({...loading, reviews: false});
  }

  async function getMyReviews({id}: {id: string}) {
    setLoading({...loading, reviews: true});

    const response = await context.auth.apiRequestContainer({
      call: 'reviews/master',
      method: 'POST',
      body: {_id: id},
    });

    console.log(
      response.data.reviews?.length,
      'response.data.reviews MY REVIEWS',
    );

    if (response.success) setMyReviews(response.data.reviews);

    setLoading({...loading, reviews: false});
  }

  function nullifyMaster() {
    setMaster(null);
    setTattoos(initialTattoos);
  }

  return {
    getMaster,
    getTattoos,
    getReviews,
    getMyTattoos,
    getMyReviews,
    nullifyMaster,
    loading,
    master,
    myTattoos,
    tattoos,
    reviews,
    myReviews,
  };
}
