import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import firestoreDB, { auth } from '../firebase.config';
import { updateProfile, updateEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {} from 'firebase/auth';

function EditProfile() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (auth.currentUser.uid !== params.profileId) navigate('/');
  });

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(firestoreDB, 'users', params.profileId);
      const docSnap = await getDoc(docRef);
      setFormData({
        username: docSnap.data().name,
        email: docSnap.data().email,
      });
    };

    fetchUser();
  }, [params.profileId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Updating Username
      if (formData.username !== auth.currentUser.displayName) {
        // Update display name in fb auth
        await updateProfile(auth.currentUser, {
          displayName: formData.username,
        });
        // update display name in firestore database
        await updateDoc(doc(firestoreDB, 'users', auth.currentUser.uid), {
          name: formData.username,
        });
      }
      // Updating email
      if (auth.currentUser.email !== formData.email) {
        await updateEmail(auth.currentUser, formData.email);

        await updateDoc(doc(firestoreDB, 'users', auth.currentUser.uid), {
          email: formData.email,
        });
      }
      toast.success('Account Updated successfully !');
      navigate(`/profile/${params.profileId}`);
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
            Profile
          </p>
          <p className="text-beige-100 font-semibold text-5xl ml-3 tracking-wider">
            {' '}
          </p>
        </div>

        {/* CONTENT */}
        <div className="px-8 pt-10 pb-9 w-72">
          <h1 className="text-3xl font-semibold mb-7">Edit Profile</h1>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-6 mb-10">
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
            </div>

            <button
              type="submit"
              className="text-center w-full bg-gradient-to-r from-pTeal-100 to-teal-300 text-white uppercase text-base py-1 tracking-wider shadow-md hover:brightness-105 active:shadow-sm duration-300"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
