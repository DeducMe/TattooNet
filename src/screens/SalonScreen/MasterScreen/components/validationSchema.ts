import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const masterEditable = yup.object().shape({
  name: yup.string(),
  address: yup.string(),
  email: yup.string().email('Email is not valid'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});
