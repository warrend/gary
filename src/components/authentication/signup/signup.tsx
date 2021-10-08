import React, { useState } from 'react';
import { Formik, FormikHelpers, useFormik } from 'formik';
import TextInput from '../../reusables/text-input';
import Button from '../../reusables/button';
import { useAuth } from '../../../contexts/auth-context';
import {
  EMAIL_LABEL,
  EMAIL_NAME,
  EMAIL_PLACEHOLDER,
  PASSWORD_LABEL,
  PASSWORD_NAME,
  PASSWORD_PLACEHOLDER,
} from './constants';

type Values = {
  email: string;
  password: string;
};

export default function Signup(): JSX.Element {
  const auth = useAuth();
  const [error, setError] = useState<string>('');

  console.log('error', error);

  const { handleChange, values, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: async (
      { email, password }: Values,
      { setSubmitting }: FormikHelpers<Values>
    ) => {
      try {
        await auth?.signup(email, password);
        setSubmitting(false);
      } catch (e) {
        console.log('error?', e);
        setError('There was a problem');
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <TextInput
        label={EMAIL_LABEL}
        onChange={handleChange}
        name={EMAIL_NAME}
        value={values.email}
        width="250px"
        type="text"
        placeholder={EMAIL_PLACEHOLDER}
      />
      <TextInput
        label={PASSWORD_LABEL}
        onChange={handleChange}
        name={PASSWORD_NAME}
        value={values.password}
        width="250px"
        type="password"
        placeholder={PASSWORD_PLACEHOLDER}
      />
      <Button name="Sign up" type="submit" disabled={isSubmitting} />
    </form>
  );
}
