import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export default function useMaster() {
  const context = useContext(MainContext);
  const [master, setMaster] = useState(null);
  const [tattoos, setTattoos] = useState({available: [], portfolio: []});

  async function getTattoos({id}: {id: string}) {
    const response = await context.auth.apiRequestContainer({
      call: 'tattoos/master',
      method: 'POST',
      body: {id},
    });

    setTattoos(response.tattoos);
  }
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

  return {getMaster, getTattoos, nullifyMaster, master, tattoos};
}
