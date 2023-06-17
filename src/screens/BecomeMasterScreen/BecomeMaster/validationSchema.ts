import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().required('Email required').email('Email is not valid'),
  text: yup.string(),
});
