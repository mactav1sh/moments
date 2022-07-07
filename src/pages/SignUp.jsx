import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import firestoreDB, { auth } from '../firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleOAuth from '../components/GoogleOAuth';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add user to firebase authentication 'database'
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(user, {
        displayName: formData.username,
      });

      // Add user to firebase firestore (users collection)
      const docRef = doc(firestoreDB, 'users', user.uid);
      await setDoc(docRef, {
        email: user.email,
        name: user.displayName.toLowerCase(),
        createdAt: serverTimestamp(),
      });

      toast.success('Account created successfully !');
      navigate('/');
    } catch (err) {
      toast.error('Something went bad, please try again');
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
            Join
          </p>
          <p className="text-beige-100 font-semibold text-5xl ml-3 tracking-wider">
            {' '}
            Us.
          </p>
        </div>

        {/* CONTENT */}
        <div className="px-8 pt-10 pb-9 w-72">
          <h1 className="text-3xl font-semibold mb-7">Sign Up</h1>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-3 mb-5">
              <input
                onChange={onInputChange}
                value={formData.username}
                id="username"
                type="text"
                placeholder="Username"
                className="py-1 text-sm bg-beige-100 border-b border-pTeal-200 focus:outline-none"
              />

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
              Sign Up
            </button>
          </form>

          {/* Other sign up methods */}
          <div className="mt-5 border-t pt-2 ">
            <p className="text-gray-400 mb-2 text-xs text-center">
              Or use other sign up methods
            </p>
            <GoogleOAuth signText={'Sign Up'} />
          </div>

          {/* NEW ACCOUNT */}
          <div className="mt-10 border-t pt-2">
            <p className="text-gray-400 mb-2 text-xs text-center">
              Already have an account ?
            </p>
            <Link
              to="/sign-in"
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

export default SignUp;
