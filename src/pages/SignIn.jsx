import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import GoogleOAuth from '../components/GoogleOAuth';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (user !== null) navigate(`/profile/${auth.currentUser.uid}`);

      toast.success('Signed in successfully');
    } catch (err) {
      toast.error('Something went wrong please try again.');
    }
  };

  const onInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-200">
      <div className="flex max-w-6xl bg-beige-100 shadow-lg">
        {/* IMAGE */}
        <div className="bg-brick-pattern hidden md:flex md:flex-col md:items-center md:justify-center w-[28rem] md:space-y-2 ">
          <p className="text-beige-100 font-semibold text-5xl tracking-wider">
            Welcome
          </p>
          <p className="text-beige-100 font-semibold text-5xl tracking-wider">
            Back !
          </p>
        </div>

        {/* CONTENT */}
        <div className="px-8 pt-10 pb-9 w-72">
          <h1 className="text-3xl font-semibold mb-7">Sign in</h1>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-3 mb-5">
              <input
                onChange={onInputChange}
                value={formData.email}
                id="email"
                type="text"
                placeholder="Email Address"
                className="py-1 text-sm bg-beige-100 border-b border-pTeal-200  focus:outline-none"
              />

              <input
                onChange={onInputChange}
                value={formData.password}
                id="password"
                type="password"
                placeholder="Password"
                className="py-1 text-sm bg-beige-100 border-b border-pTeal-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="text-center w-full bg-gradient-to-r from-pTeal-100 to-teal-300 text-white uppercase text-base py-1 tracking-wider shadow-md hover:brightness-105 active:shadow-sm duration-300"
            >
              Sign In
            </button>
            {/* Forgot password */}
            <Link
              to="/forgot-password"
              className="text-center inline-block w-full text-sm py-1 tracking-wider mt-3 hover:text-pTeal-100 active:text-pTeal-100 duration-200 "
            >
              Forgot Password
            </Link>
          </form>

          {/* Other sign in methods */}
          <div className="mt-5 border-t pt-2 ">
            <p className="text-gray-400 mb-2 text-xs text-center">
              Or use other sign methods
            </p>
            <GoogleOAuth signText={'Sign in'} />
          </div>

          {/* NEW ACCOUNT */}
          <div className="mt-10 border-t pt-2">
            <p className="text-gray-400 mb-2 text-xs text-center">
              Don't have an account ?
            </p>
            <Link
              to="/sign-up"
              className="text-center inline-block w-full 
               bg-gradient-to-r from-beige-500 to-beige-400 text-white text-base py-1 tracking-wider shadow-md hover:brightness-105 active:shadow-sm duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
