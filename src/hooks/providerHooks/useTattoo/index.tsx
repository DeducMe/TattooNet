import {AppContext} from 'providers/AppProvider';
import {useContext, useState} from 'react';

export default function useTattoo() {
  const context = useContext(AppContext);
  const [tattoo, setTattoo] = useState(null);

  async function getTattoo({id}: {id: string}) {
    const response = await context.auth.apiRequestContainer({
      call: 'tattoo',
      method: 'GET',
      body: {id},
    });

    setTattoo(response.tattoo);
  }

  function nullifyTattoo() {
    setTattoo(null);
  }

  return {getTattoo, nullifyTattoo, tattoo};
}
