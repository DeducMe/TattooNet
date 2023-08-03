import {makeImagesFromResponseBase64} from 'common/function';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export type Review = {
  userProfileId: any;
  _id: string;
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
    const result = response.data.reviews.map(item => {
      if (item.images[0]?.imageObject?.[0]?.data?.data)
        item.images = makeImagesFromResponseBase64(item.images, true);

      return item;
    });
    if (response.success) setReviews(result);

    setLoading({...loading, reviews: false});
  }

  async function getMyReviews({id}: {id: string}) {
    setLoading({...loading, reviews: true});

    const response = await context.auth.apiRequestContainer({
      call: 'reviews/master',
      method: 'POST',
      body: {_id: id},
    });

    const result = response.data.reviews.map(item => {
      if (item.images[0]?.imageObject?.[0]?.data?.data)
        item.images = makeImagesFromResponseBase64(item.images, true);

      return item;
    });

    if (response.success) setMyReviews(result);

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
