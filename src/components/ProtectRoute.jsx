import { useEffect, useState, useRef } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from './Loader';

function ProtectRoute() {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const _isMounted = useRef(true);

  useEffect(() => {
    if (_isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) setIsLogged(true);
        setLoading(false);
      });
    }
    return () => (_isMounted.current = false);
  }, []);

  if (loading) return <Loader />;

  return isLogged ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectRoute;
