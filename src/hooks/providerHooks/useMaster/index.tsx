import {AppContext} from 'providers/AppProvider';
import {useContext, useState} from 'react';

export default function useMaster() {
  const context = useContext(AppContext);
  const [master, setMaster] = useState(null);

  async function getMaster({id}: {id: string}) {
    const response = await context.auth.apiRequestContainer({
      call: 'master',
      method: 'GET',
      body: {id},
    });

    setMaster(response.master);
  }

  function nullifyMaster() {
    setMaster(null);
  }

  return {getMaster, nullifyMaster, master};
}
