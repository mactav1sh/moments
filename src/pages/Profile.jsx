import React, { useState, useContext, useEffect } from 'react';
import { auth } from '../firebase.config';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { SignedContext } from '../context/SignedContext';
import { FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import firestoreDB from '../firebase.config';
import Loader from '../components/Loader';

function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [selected, setSelected] = useState('uploaded');
  const [authorized, setAuthorized] = useState(false);

  const { setSignedIn } = useContext(SignedContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(firestoreDB, 'users', params.profileid);
      const docSnap = await getDoc(docRef);
      setProfile({ id: docSnap.id, data: docSnap.data() });
      if (auth.currentUser.uid === params.profileid) setAuthorized(true);
      setLoading(false);
    };

    fetchProfile();
  }, [params.profileid]);

  const onLogout = () => {
    auth.signOut();
    setSignedIn(false);
    navigate('/sign-in');
  };

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-200">
      <div className="flex flex-col items-center max-w-6xl bg-beige-100 shadow-lg px-10 py-10 mx-2 md:min-w-[28rem] mt-10">
        {/* Profile image */}
        <div className="h-32 w-32 rounded-full flex items-center justify-center mb-8 bg-blue-100">
          <p className="uppercase text-5xl">{profile.data.name.slice(0, 1)}</p>
        </div>
        <h1 className="text-4xl font-semibold mb-2 max-w-xs text-center">
          {profile.data.name}
        </h1>

        {/* Email */}
        {authorized ? (
          <p className="text-gray-400 mb-8">{profile.data.email} </p>
        ) : null}

        {/* Profile Private buttons */}
        {authorized ? (
          <div className="flex space-x-4 mb-12">
            <Link
              to={`/edit-profile/${params.profileid}`}
              className="rounded-sm shadow-sm bg-gray-200 px-2 py-1 hover:bg-gray-300 duration-150 flex items-center space-x-2"
            >
              <span>Edit Profile</span>
              <FaUserEdit />
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 hover:text-gray-400 duration-200 "
            >
              <span>Logout</span>
              <FaSignOutAlt className="text-sm" />
            </button>
          </div>
        ) : null}

        {/* MOMENTS ( CREATED OR SAVED) - will be implement soon */}
        <div className="flex space-x-6">
          <p
            onClick={() => setSelected('uploaded')}
            className={`font-semibold text-lg cursor-pointer hover:bg-gray-200 p-2 pt-3 rounded-sm transition-colors duration-150 ${
              selected === 'uploaded'
                ? 'border-b-4 border-pTeal-100 hover:bg-beige-100'
                : ''
            }`}
          >
            Uploaded
          </p>
          <p
            onClick={() => setSelected('saved')}
            className={`font-semibold text-lg cursor-pointer hover:bg-gray-200 p-2 pt-3 rounded-sm transition-colors duration-150 ${
              selected === 'saved'
                ? 'border-b-4 border-pTeal-100 hover:bg-beige-100'
                : ''
            }`}
          >
            Saved
          </p>
        </div>
        <p className="mt-4">Will be implemented soon !</p>
      </div>
    </div>
  );
}

export default Profile;
