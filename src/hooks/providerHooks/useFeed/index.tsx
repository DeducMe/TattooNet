import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export default function useFeed() {
  const context = useContext(MainContext);
  const [feed, setFeed] = useState(null);

  async function getFeed() {
    const response = await context.auth.apiRequestContainer({
      call: 'feed',
      method: 'GET',
    });

    setFeed(response.feed);
  }

  return {getFeed, feed};
}
