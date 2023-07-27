import useStateWithCallback from 'hooks/useStateWithCallback';
import {AppContext, AppContextT} from 'providers/AppProvider';
import {MainContext} from 'providers/MainProvider';
import {
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {ImageOrVideo} from 'react-native-image-crop-picker';

export default function useNewTatto() {
  const context = useContext(MainContext);
  const appContext = useContext(AppContext);

  const [newTattoo, setNewTattoo] = useStateWithCallback<
    AppContextT['newTattoo']['newTattoo']
  >({
    name: '',
    images: [],
    type: 'completed',
  });
  const [loading, setLoading] = useState(false);

  function nullify() {
    setNewTattoo(
      {
        name: '',
        images: [],
        type: 'completed',
      },
      () => {},
    );
  }

  function updateAndSave({
    name,
    price,
    currency,
    description,
    type,
  }: {
    name: string;
    price?: number;
    currency?: string;
    description?: string;
    type?: string;
  }) {
    setLoading(true);

    setNewTattoo(
      {
        ...newTattoo,
        type: type || 'completed',
        name,
        price,
        currency,
        description,
      },
      newTattoo => {
        const {images, ...props} = newTattoo;

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

        context.auth
          .apiRequestContainer({
            call: 'tattoos',
            method: 'POST',
            body: data,
            headers: {
              'Content-Type': `multipart/form-data; `,
            },
            noStringify: true,
          })
          .then(response => {
            if (response.success) nullify();

            appContext.tattoos.getMyTattoos({
              id: appContext.myProfile.profile._id,
            });

            context.navigation?.goBack();

            // context.navigation?.goBack();
          })
          .catch(e => {
            setLoading(false);
          });
      },
    );
  }
  function addImage(image: ImageOrVideo) {
    setNewTattoo(
      {
        ...newTattoo,
        images: newTattoo?.images.concat([image]),
      },
      () => {},
    );
  }
  function deleteImage(index: number) {
    setNewTattoo(
      {
        ...newTattoo,
        images: newTattoo?.images.filter((item, i) => i !== index),
      },
      () => {},
    );
  }

  const result = {
    addImage: useCallback(addImage, [newTattoo]),
    updateAndSave: useCallback(updateAndSave, [newTattoo, appContext]),
    deleteImage: useCallback(deleteImage, [newTattoo]),
    nullify: useCallback(nullify, []),
    newTattoo: useMemo(() => newTattoo, [newTattoo]),
    loading: useMemo(() => loading, [loading]),
  };

  return useMemo(() => result, [context, result]);
}
