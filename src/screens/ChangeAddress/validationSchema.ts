import * as yup from 'yup';

export const schema = yup.object().shape({
  country_code: yup.string().required('Country Code is required'),
  city: yup.string(),
  address: yup.string(),
  postcode: yup.string(),
});
