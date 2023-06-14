import {AppContext} from 'providers/AppProvider';
import {useContext, useState} from 'react';

export default function useFeed() {
  const context = useContext(AppContext);
  const [feed, setFeed] = useState(null);

  async function getFeed() {
    const response = await context.auth.apiRequestContainer({
      call: 'feed',
      method: 'GET',
      body: {},
    });

    setFeed(response.feed);
  }

  return {getFeed, feed};
}
