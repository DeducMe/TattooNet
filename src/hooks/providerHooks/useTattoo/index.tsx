import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export default function useTattoo() {
  const context = useContext(MainContext);
  const [tattoo, setTattoo] = useState(null);

  async function getTattoo({id}: {id: string}) {
    const response = await context.auth.apiRequestContainer({
      call: 'tattoo',
      method: 'POST',
      body: {id},
    });

    setTattoo(response.tattoo);
  }

  function nullifyTattoo() {
    setTattoo(null);
  }

  return {getTattoo, nullifyTattoo, tattoo};
}
