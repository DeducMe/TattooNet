import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {URL} from './config';

export const apiRequest = async (
  path: string,
  method: string,
  body?: any,
  token?: string | any,
) => {
  const response = await fetch(`${URL}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? {Authorization: token} : {}),
    },
    ...(!!body ? {body: JSON.stringify(body)} : {}),
  });

  let errorMessage = '';
  let tokenValid = true;

  if (response.status === 405) {
    errorMessage = 'You are not authorized';
    tokenValid = false;
  }
  if (response.status === 413) {
    errorMessage = 'Media is too large';
  }
  if (response.status === 404) {
    errorMessage = `There is no method ${path}`;
  }

  let result;
  try {
    result = await response.json();
  } catch (e) {
    Toast.show({
      text1: result?.message || errorMessage || e,
      type: 'error',
      visibilityTime: 3000,
    });
    return {success: false, data: null, token: tokenValid};
  }
  if (!response.ok || errorMessage) {
    console.log('API ERROR', result);
    Toast.show({
      text1: result?.message || errorMessage || 'Api call failed',
      type: 'error',
      visibilityTime: 3000,
    });
    return {success: false, data: null, token: tokenValid};
  }

  return {success: true, data: result, token: tokenValid};
};
