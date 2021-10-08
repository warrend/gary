import React, { useState } from 'react';
import { useFormik, FormikHelpers } from 'formik';
import { useAuth } from '../../../contexts/auth-context';
import TextInput from '../../reusables/text-input';
import Button from '../../reusables/button';
import Radio from '../../reusables/radio';
import {
  EMAIL_LABEL,
  EMAIL_NAME,
  EMAIL_PLACEHOLDER,
  PASSWORD_LABEL,
  PASSWORD_NAME,
  PASSWORD_PLACEHOLDER,
} from './constants';

type Values = {
  radio: string;
  email: string;
  password: string;
};

export default function Login(): JSX.Element {
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { handleChange, setFieldValue, values, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        radio: '',
        email: '',
        password: '',
      },

      onSubmit: async (
        { radio, email, password }: Values,
        { setSubmitting }: FormikHelpers<Values>
      ) => {
        try {
          //@ts-ignore
          console.log('this', radio);
          await auth?.signup(email, password, radio);
          setSubmitting(false);
        } catch (e) {
          setError('There was a problem');
        }
      },
    });

  console.log('values', values);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Radio
          text="Practice"
          value="practice"
          checked={values.radio === 'practice'}
          name="practice"
          onClick={(e: any) => setFieldValue('radio', e.target.value)}
        />
        <Radio
          text="Lab"
          value="lab"
          checked={values.radio === 'lab'}
          name="lab"
          onClick={(e: any) => setFieldValue('radio', e.target.value)}
        />
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
    </div>
  );
}
