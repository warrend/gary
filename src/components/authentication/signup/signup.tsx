import React, { useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import TextInput from '../../reusables/text-input';
import Button from '../../reusables/button';
import { useAuth } from '../../../contexts/auth-context';
import Radio from '../../reusables/radio';
import RadioGroup from '../../reusables/radio-group';
import styles from './signup.module.scss';
import {
  EMAIL_LABEL,
  EMAIL_NAME,
  EMAIL_PLACEHOLDER,
  PASSWORD_LABEL,
  PASSWORD_NAME,
  PASSWORD_PLACEHOLDER,
} from './constants';

export type TAddress = {
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
  businessName: string;
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
      businessName: '',
    },

    onSubmit: async (
      { email, password, address, businessName, accountType }: TValues,
      { setSubmitting }: FormikHelpers<TValues>
    ) => {
      try {
        await auth?.signup(email, password, address, businessName, accountType);
        setSubmitting(false);
      } catch (e) {
        console.error(e);
        setFieldError('emailAlreadyInUse', 'email already in use');
      }
    },
  });

  const radioConfig = [
    {
      text: 'Practice',
      value: 'practices',
      checked: values.accountType === 'practices',
      name: 'practices',
      onClick: (e: any) => setFieldValue('accountType', e.target.value),
    },
    {
      text: 'Lab',
      value: 'labs',
      checked: values.accountType === 'labs',
      name: 'labs',
      onClick: (e: any) => setFieldValue('accountType', e.target.value),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        {errors && errors.email && <div>Email already in use</div>}
        <TextInput
          label={EMAIL_LABEL}
          onChange={handleChange}
          name={EMAIL_NAME}
          value={values.email}
          type="text"
          placeholder={EMAIL_PLACEHOLDER}
        />
        <TextInput
          label={PASSWORD_LABEL}
          onChange={handleChange}
          name={PASSWORD_NAME}
          value={values.password}
          type="password"
          placeholder={PASSWORD_PLACEHOLDER}
        />
        <RadioGroup heading="Business type" config={radioConfig} />
        <TextInput
          label="Company name"
          onChange={handleChange}
          name="businessName"
          value={values.businessName}
          type="text"
          placeholder="Company, Inc."
        />
        <TextInput
          label="Street"
          onChange={handleChange}
          name="address.street"
          value={values.address.street}
          type="text"
          placeholder="123 Main Street"
        />
        <div className={styles.half}>
          <TextInput
            label="City"
            onChange={handleChange}
            name="address.city"
            value={values.address.city}
            type="text"
            placeholder="Columbus"
          />
          <TextInput
            label="State"
            onChange={handleChange}
            name="address.state"
            value={values.address.state}
            type="text"
            placeholder="OH"
          />
        </div>
        <div className={styles.half}>
          <TextInput
            label="Zipcode"
            onChange={handleChange}
            name="address.zipcode"
            value={values.address.zipcode}
            type="text"
            placeholder="43214"
          />
          <TextInput
            label="Phone number"
            onChange={handleChange}
            name="phone"
            value={values.phone}
            type="text"
            placeholder="Your number"
          />
        </div>
        <Button
          name="Sign up"
          type="submit"
          disabled={isSubmitting}
          style={{ marginRight: 10 }}
        />
        <Button name="Already have an account?" type="button" secondary />
      </form>
    </div>
  );
}
