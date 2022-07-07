import React, { useEffect, useState } from 'react';
import { auth } from '../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

export const SignedContext = React.createContext();

function SignedProvider({ children }) {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setSignedIn(true);
    });
  }, []);

  const value = {
    signedIn,
    setSignedIn,
  };
  return (
    <SignedContext.Provider value={value}>{children}</SignedContext.Provider>
  );
}

export default SignedProvider;
