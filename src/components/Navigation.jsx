import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoDiamondSharp } from 'react-icons/io5';
import { SignedContext } from '../context/SignedContext';
import { auth } from '../firebase.config';

function Navigation() {
  const { signedIn } = useContext(SignedContext);

  const [selected, setSelected] = useState('/');

  const selectedRoute = (route) => {
    if (selected === route)
      return 'text-pTeal-200 border-b-2 border-pTeal-100 cursor-default';
  };

  return (
    <nav>
      <div className="flex h-12 px-3 justify-between items-center bg-beige-100 md:px-5 md:h-14">
        <Link
          to="/"
          className="text-pTeal-200 flex space-x-2"
          onClick={() => setSelected('/')}
        >
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
                    onClick={() => setSelected('profile')}
                    className={`duration-150 transition-colors hover:text-pTeal-200 ${selectedRoute(
                      'profile'
                    )}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/upload"
                    onClick={() => setSelected('upload')}
                    className={`duration-150 transition-colors hover:text-pTeal-200 ${selectedRoute(
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
                    onClick={() => setSelected('sign-in')}
                    className={`duration-150 transition-colors hover:text-pTeal-200 ${selectedRoute(
                      'sign-in'
                    )}`}
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sign-up"
                    onClick={() => setSelected('sign-up')}
                    className={`duration-150 transition-colors hover:text-pTeal-200 ${selectedRoute(
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
