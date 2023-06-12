import {View, Text} from 'react-native';
import React from 'react';
import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().required('Email required field').email('Invalid Email'),
  password: yup
    .string()
    .required('Password required field')
    .min(8, 'Password is too short')
    .max(16, 'Password is too long')
    .matches(/[-_]/, 'Password must contain special symbols')
    .matches(/[a-zA-Z]/, 'Password must contain latin letters')
    .matches(/[0-9]/, 'Password must contain digits'),
  // name: yup
  //   .string()
  //   .required('Name required field')
  //   .matches(/^[a-zA-Z]*$/, 'Password must contain only latin letters'),
});
