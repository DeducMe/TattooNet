import {makeImagesFromResponseBase64} from 'common/function';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export default function useMaster() {
  const context = useContext(MainContext);
  const [master, setMaster] = useState(null);
  const [loading, setLoading] = useState({
    master: false,
    reviews: false,
  });

  async function getMaster({id}: {id: string}) {
    console.log('ALO getMaster');
    setLoading({...loading, master: true});

    const response = await context.auth.apiRequestContainer({
      call: 'profile/search',
      method: 'POST',
      body: {_id: id},
    });

    if (response.success) {
      const result = response.data.profile?.[0] || response.data.profile;
      if (result.avatar?.imageObject?.[0]?.data?.data)
        result.avatar = makeImagesFromResponseBase64(result.avatar, false);

      console.log(result.avatar, 'alo');
      setMaster(result);
    }

    setLoading({...loading, master: false});
  }

  function nullifyMaster() {
    setMaster(null);
  }

  return {
    getMaster,
    nullifyMaster,
    loading,
    master,
  };
}
