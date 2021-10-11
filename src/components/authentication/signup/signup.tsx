import React, { useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import TextInput from '../../reusables/text-input';
import Button from '../../reusables/button';
import { useAuth } from '../../../contexts/auth-context';
import Radio from '../../reusables/radio';
import {
  EMAIL_LABEL,
  EMAIL_NAME,
  EMAIL_PLACEHOLDER,
  PASSWORD_LABEL,
  PASSWORD_NAME,
  PASSWORD_PLACEHOLDER,
} from './constants';
import { stringify } from 'querystring';

type TAddress = {
  city: string;
  state: string;
  street: string;
  zipcode: number | string;
};

type TValues = {
  email: string;
  password: string;
  accountType: 'practices' | 'labs' | '';
  address: TAddress;
  name: string;
  phone: number | string;
};

export default function Signup(): JSX.Element {
  const auth = useAuth();

  const {
    handleChange,
    values,
    handleSubmit,
    setFieldValue,
    setFieldError,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      accountType: '',
      address: { city: '', state: '', street: '', zipcode: '' },
      phone: '',
      name: '',
    },

    onSubmit: async (
      { email, password }: TValues,
      { setSubmitting }: FormikHelpers<TValues>
    ) => {
      try {
        await auth?.signup(email, password);
        setSubmitting(false);
      } catch (e) {
        console.error(e);
        setFieldError('emailAlreadyInUse', 'email already in use');
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      {errors && errors.email && <div>Email already in use</div>}
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
      <Radio
        text="Practice"
        value="practice"
        checked={values.accountType === 'practices'}
        name="practice"
        onClick={(e: any) => setFieldValue('radio', e.target.value)}
      />
      <Radio
        text="Lab"
        value="lab"
        checked={values.accountType === 'labs'}
        name="lab"
        onClick={(e: any) => setFieldValue('radio', e.target.value)}
      />
      <TextInput
        label="Street"
        onChange={handleChange}
        name="address.street"
        value={values.address.street}
        width="250px"
        type="text"
        placeholder="123 Main Street"
      />
      <TextInput
        label="City"
        onChange={handleChange}
        name="address.city"
        value={values.address.city}
        width="250px"
        type="text"
        placeholder="Columbus"
      />
      <TextInput
        label="State"
        onChange={handleChange}
        name="address.state"
        value={values.address.state}
        width="250px"
        type="text"
        placeholder="OH"
      />
      <TextInput
        label="Zipcode"
        onChange={handleChange}
        name="address.zipcode"
        value={values.address.zipcode}
        width="250px"
        type="text"
        placeholder="43214"
      />
      <TextInput
        label="Company name"
        onChange={handleChange}
        name="address.name"
        value={values.name}
        width="250px"
        type="text"
        placeholder="Company, Inc."
      />

      <Button name="Sign up" type="submit" disabled={isSubmitting} />
    </form>
  );
}
