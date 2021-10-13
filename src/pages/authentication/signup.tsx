import React from 'react';
import Signup from '../../components/authentication/signup';
import styles from './auth.module.scss';

function SignupPage(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Signup />;
    </div>
  );
}

export default SignupPage;
