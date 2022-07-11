import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoDiamondSharp } from 'react-icons/io5';
import { SignedContext } from '../context/SignedContext';
import { auth } from '../firebase.config';

function Navigation() {
  // const [selected, setSelected] = useState('/');
  const { signedIn } = useContext(SignedContext);

  const location = useLocation();

  const matchRoute = (route) => {
    if (location.pathname.startsWith(`/${route}`))
      return 'text-pTeal-200 border-b-2 border-pTeal-100 cursor-default';
  };

  return (
    <nav>
      <div className="flex h-12 px-3 justify-between items-center bg-beige-100 md:px-5 md:h-14">
        <Link to="/" className="text-pTeal-200 flex space-x-2">
          <IoDiamondSharp className="text-3xl md:text-4xl" />
          <span className="text-xl font-bold tracking-wider uppercase md:text-2xl">
            Moments
          </span>
        </Link>
        <ul>
          <div className="flex space-x-3 md:text-lg uppercase tracking-wide">
            {signedIn ? (
              <>
                <li>
                  <Link
                    to={`/profile/${auth.currentUser.uid}`}
                    className={`duration-150 transition-colors hover:text-pTeal-200 ${matchRoute(
                      'profile'
                    )}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/upload"
                    className={`duration-150 transition-colors hover:text-pTeal-200 ${matchRoute(
                      'upload'
                    )}`}
                  >
                    Upload
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/sign-in"
                    className={`duration-150 transition-colors hover:text-pTeal-200 ${matchRoute(
                      'sign-in'
                    )}`}
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sign-up"
                    className={`duration-150 transition-colors hover:text-pTeal-200 ${matchRoute(
                      'sign-up'
                    )}`}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
