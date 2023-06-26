import {AppContext} from 'providers/AppProvider';
import {CurrencyT, MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

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
  });

  const [tattoos, setTattoos] = useState(initialTattoos);
  const [myTattoos, setMyTattoos] = useState(initialTattoos);

  async function getTattoos({id}: {id: string}) {
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
    setLoading({...loading, myTattoos: true});

    const response = await context.auth.apiRequestContainer({
      call: 'tattoos/master',
      method: 'POST',
      body: {id},
    });

    console.log(response);
    if (response.success) setMyTattoos(response.data.tattoos);

    setLoading({...loading, myTattoos: false});
  }

  async function getMaster({id}: {id: string}) {
    setLoading({...loading, master: false});

    const response = await context.auth.apiRequestContainer({
      call: 'profile',
      method: 'GET',
      body: {id},
    });
    if (response.success) setMaster(response.data.master);

    setLoading({...loading, master: true});
  }

  function nullifyMaster() {
    setMaster(null);
    setTattoos(initialTattoos);
  }

  return {
    getMaster,
    getTattoos,
    getMyTattoos,
    nullifyMaster,
    loading,
    master,
    myTattoos,
    tattoos,
  };
}
