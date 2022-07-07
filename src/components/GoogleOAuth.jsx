import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firestoreDB, { auth } from '../firebase.config';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

function GoogleOAuth({ signText }) {
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      // CHECK IF USER EXISTS IN FS DATABASE / IF NOT => ADD TO FS DB
      const docRef = await getDoc(doc(firestoreDB, 'users', user.uid));
      if (!docRef.exists()) {
        await setDoc(doc(firestoreDB, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
      // SIGN IN AND NAVIGATE TO HOME
      navigate('/profile');
    } catch (error) {
      toast.error(`Couldn't sign in with Google`);
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className="text-center w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white text-base py-1 tracking-wider shadow-md hover:brightness-105 active:shadow-sm duration-300"
    >
      <div className="flex justify-center items-center space-x-2">
        <FaGoogle className="text-blue-100" />
        <p className="text-blue-100 ">{signText} With Google</p>
      </div>
    </button>
  );
}

export default GoogleOAuth;
