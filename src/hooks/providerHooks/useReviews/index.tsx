import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export type Review = {
  images: string[];
  text: string;
  name: string;
  rating: number;
  updatedAt: string;
};

export default function useReviews() {
  const context = useContext(MainContext);
  const [loading, setLoading] = useState({
    reviews: false,
  });

  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);

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

  function nullifyReviews() {
    setReviews([]);
  }

  return {
    getReviews,
    getMyReviews,
    nullifyReviews,
    loading,
    reviews,
    myReviews,
  };
}
