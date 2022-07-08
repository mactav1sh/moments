import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { SignedContext } from '../context/SignedContext';

function ProtectRoute() {
  const { signedIn } = useContext(SignedContext);

  return signedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectRoute;
