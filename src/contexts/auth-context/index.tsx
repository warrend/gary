import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  getDocs,
  setDoc,
  addDoc,
  collection,
  doc,
} from 'firebase/firestore';
import { TAddress } from '../../components/authentication/signup/signup';

type TContextProps = {
  children?: React.ReactNode;
};

type TContextValues = {
  [key: string]: any;
} | null;

const AuthContext = createContext({} as TContextValues | null);

export function useAuth(): TContextValues {
  return useContext(AuthContext);
}

export default function AuthContextProvider({
  children,
}: TContextProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function signup(
    email: string,
    password: string,
    address: TAddress,
    businessName: string,
    accountType: string
  ) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, accountType, res.user.uid);
      await setDoc(docRef, {
        address,
        businessName,
      });
    } catch (e) {
      console.error(e);
    }
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email: string): any {
    return currentUser && updateEmail(currentUser, email);
  }

  function updateUserPassword(password: string): any {
    return currentUser && updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setCurrentUser);

    return unsubscribe;
  }, []);

  const context = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}
