import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export default function useTattoo() {
  const context = useContext(MainContext);
  const [tattoo, setTattoo] = useState(null);
  const [loading, setLoading] = useState(false);
  async function getTattoo({id}: {id: string}) {
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'tattoos',
      method: 'POST',
      body: {id},
    });
    setLoading(false);

    setTattoo(response.data.tattoo);
  }

  function nullifyTattoo() {
    setTattoo(null);
  }

  async function submitTattoo({
    reviewText,
    _id,
    userProfileId,
    images,
    starRating,
  }) {
    setLoading(true);

    const response = await context.auth.apiRequestContainer({
      call: 'reviews',
      method: 'POST',
      body: {reviewText, _id, userProfileId, images, starRating},
    });

    setLoading(false);

    context.navigation?.goBack();
  }

  return {getTattoo, nullifyTattoo, tattoo, submitTattoo, loading};
}
