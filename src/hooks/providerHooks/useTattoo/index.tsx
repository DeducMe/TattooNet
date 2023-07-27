import {AppContext} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {useContext, useState} from 'react';

export default function useTattoo() {
  const context = useContext(MainContext);
  const appContext = useContext(AppContext);
  const [tattoo, setTattoo] = useState(null);
  const [loading, setLoading] = useState(false);
  async function getTattoo({id}: {id: string}) {
    setLoading(true);
    const response = await context.auth.apiRequestContainer({
      call: 'tattoos',
      method: 'POST',
      body: {id},
    });
    setLoading(false);

    setTattoo(response.data.tattoo);
  }

  function nullifyTattoo() {
    setTattoo(null);
  }

  async function submitTattoo(params) {
    const {images, ...props} = params;
    setLoading(true);
    const files = images.map(image => ({
      uri: image.path, // e.g. 'file:///path/to/file/image123.jpg'
      name: image.filename, // e.g. 'image123.jpg',
      type: image.mime, // e.g. 'image/jpg'
    }));

    const data = new FormData();

    files.forEach(item => {
      data.append('images[]', item);
    });

    Object.keys(props).forEach(key => {
      data.append(key, props[key]);
    });

    console.log(files);

    await context.auth.apiRequestContainer({
      call: 'reviews',
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': `multipart/form-data; `,
      },
      noStringify: true,
    });

    const isMaster = props.masterId === appContext.myProfile?.profile?._id;

    if (isMaster) {
      await appContext.tattoos.getMyTattoos({id: props.masterId});
    } else {
      await appContext.tattoos.getTattoos({id: props.masterId});
    }

    setLoading(false);

    context.navigation?.goBack();
    context.navigation?.goBack();
  }

  return {getTattoo, nullifyTattoo, tattoo, submitTattoo, loading};
}
