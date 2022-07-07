import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [linkSent, SetLinkSent] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      SetLinkSent(true);
      navigate('/sign-in');
      toast.success('Password reset link was sent successfully');
    } catch (err) {
      toast.error(err.message);
      SetLinkSent(false);
    }
  };

  const onInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-200">
      <div className="flex max-w-6xl bg-beige-100 shadow-lg">
        {/* IMAGE */}
        <div className="bg-brick-pattern hidden md:flex md:flex-col md:items-center md:justify-center w-[28rem] md:space-y-2 ">
          <p className="text-beige-100 font-semibold text-5xl tracking-wider">
            Get Back
          </p>
          <p className="text-beige-100 ml-3 font-semibold text-5xl tracking-wider ">
            On Board.
          </p>
        </div>

        {/* CONTENT */}
        <div className="px-8 pt-10 pb-9">
          <h1 className="text-3xl font-semibold mb-7">Reset Password</h1>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-5 mb-5">
              <input
                onChange={onInputChange}
                value={email}
                id="email"
                type="text"
                placeholder="Email Address"
                className="py-1 text-sm bg-beige-100 border-b border-pTeal-200  focus:outline-none"
              />
              <button
                type="submit"
                className="text-center w-full bg-gradient-to-r from-pTeal-100 to-teal-300 text-white uppercase text-base py-1 tracking-wider shadow-md hover:brightness-105 active:shadow-sm duration-300"
                disabled={linkSent}
              >
                Send Reset Link
              </button>
            </div>
          </form>

          {/* NEW ACCOUNT */}
          <div className="mt-10 border-t pt-2">
            <p className="text-gray-400 mb-2 text-xs text-center">
              Remembered Details ?
            </p>
            <Link
              to="/sign-up"
              className="text-center inline-block w-full 
               bg-gradient-to-r from-beige-500 to-beige-400 text-white text-base py-1 tracking-wider shadow-md hover:brightness-105 active:shadow-sm duration-300"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

{
  /* <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pTeal-200 to-pGreen"> */
}
