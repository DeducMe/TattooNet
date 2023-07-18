import {AppContext} from 'providers/AppProvider';
import {CurrencyT, MainContext} from 'providers/MainProvider';
import {useContext, useEffect, useMemo, useState} from 'react';
import {MasterTattos} from '../useTattoos';

export type Review = {
  images: string[];
  text: string;
  name: string;
  rating: number;
  updatedAt: string;
};

export default function useMaster() {
  const initialTattoos: MasterTattos = {available: [], portfolio: []};
  const context = useContext(MainContext);
  const [master, setMaster] = useState(null);
  const [loading, setLoading] = useState({
    master: false,
    reviews: false,
  });

  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);

  async function getMaster({id}: {id: string}) {
    console.log('ALO getMaster');
    setLoading({...loading, master: true});

    const response = await context.auth.apiRequestContainer({
      call: 'profile/search',
      method: 'POST',
      body: {_id: id},
    });

    if (response.success)
      setMaster(response.data.profile?.[0] || response.data.profile);

    setLoading({...loading, master: false});
  }

  async function getReviews({id}: {id: string}) {
    console.log('ALO getReviews');
    setLoading({...loading, reviews: true});

    const response = await context.auth.apiRequestContainer({
      call: 'reviews/master',
      method: 'POST',
      body: {_id: id},
    });

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

    if (response.success) setMyReviews(response.data.reviews);

    setLoading({...loading, reviews: false});
  }

  function nullifyMaster() {
    setMaster(null);
  }

  return {
    getMaster,
    getReviews,
    getMyReviews,
    nullifyMaster,
    loading,
    master,
    reviews,
    myReviews,
  };
}
