import {makeImagesFromResponseBase64} from 'common/function';
import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export default function useFeed() {
  const context = useContext(MainContext);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getFeed() {
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'feed',
      method: 'GET',
    });

    setLoading(false);

    if (response.success) {
      const result = response.data.feed.map(item => {
        item.tattoos = item.tattoos.map(item => {
          if (item.images[0]?.imageObject?.[0]?.data?.data)
            item.images = makeImagesFromResponseBase64(item.images, true);
          return item;
        });
        if (item.master.avatar?.imageObject?.[0]?.data?.data)
          item.master.avatar = makeImagesFromResponseBase64(
            item.master.avatar,
            false,
          );

        return item;
      });

      setFeed(result);
    }
  }

  return {getFeed, feed, loading};
}
