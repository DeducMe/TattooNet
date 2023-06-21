import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export default function useFeed() {
  const context = useContext(MainContext);
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getFeed() {
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'feed',
      method: 'GET',
    });
    setLoading(false);

    console.log(response);

    setFeed(response.feed);
  }

  return {getFeed, feed, loading};
}
