import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import firestoreDB, { auth } from '../firebase.config';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

function EditPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    private: false,
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(firestoreDB, 'posts', params.postId);
      const docSnap = await getDoc(docRef);
      setPost({ id: docSnap.id, data: docSnap.data() });

      // Authorization
      if (docSnap.data().userId !== auth.currentUser.uid) navigate('/');

      setFormData({
        title: docSnap.data().title,
        description: docSnap.data().description,
        private: docSnap.data().private,
      });

      setLoading(false);
    };

    fetchPost();
  }, [params.postId, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(firestoreDB, 'posts', params.postId);
      await updateDoc(docRef, { ...formData });
      navigate(`/moment/${params.postId}`);
      toast.success('image updated successfully');
    } catch (err) {
      toast.error('Some error happened please try again');
    }
  };

  const onInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onPrivateSelect = (e) => {
    const value = e.target.value === 'true' ? true : false;
    setFormData((prev) => ({ ...prev, private: value }));
  };

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-200">
      <div className="flex flex-col items-center md:mx-2 md:flex-row max-w-6xl bg-beige-100 shadow-lg my-10">
        <img
          className="max-w-sm"
          src={post.data.imageUrl}
          alt={post.data.title}
        />

        {/* CONTENT */}
        <div className="px-3 pt-10 pb-9 w-80">
          <h1 className="text-3xl font-semibold mb-7">Edit Post</h1>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-10 mb-5">
              <input
                onChange={onInputChange}
                value={formData.title}
                id="title"
                type="text"
                placeholder="Title"
                className="py-1 text-sm bg-beige-100 border-b border-pTeal-200  focus:outline-none"
                required
              />

              <textarea
                rows={2}
                onChange={onInputChange}
                value={formData.description}
                id="description"
                placeholder="Description"
                className=" text-sm bg-beige-100 border-b border-pTeal-200 focus:outline-none"
              />
            </div>

            <p className="mb-2 font-semibold">Private</p>

            {/* Private options */}
            <div>
              {/* --Option one */}
              <div className="flex items-center space-x-5 mb-2">
                <label htmlFor="yes" className="w-6">
                  Yes
                </label>
                <div
                  className={`w-3 h-3  rounded-full outline outline-offset-2 outline-pTeal-100  ${
                    formData.private ? 'bg-pTeal-100' : 'bg-gray-300'
                  }`}
                >
                  <input
                    onChange={onPrivateSelect}
                    type="radio"
                    name="private"
                    id="yes"
                    value={true}
                    className="opacity-0 w-full h-full"
                  />
                </div>
              </div>

              {/* --Option two */}
              <div className="flex items-center space-x-5 mb-10">
                <label htmlFor="no" className="w-6">
                  No
                </label>
                <div
                  className={`w-3 h-3 rounded-full outline outline-offset-2 outline-pTeal-100 ${
                    formData.private ? 'bg-gray-300' : 'bg-pTeal-100'
                  }`}
                >
                  <input
                    onChange={onPrivateSelect}
                    type="radio"
                    name="private"
                    id="no"
                    value={false}
                    className="opacity-0 w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Submitting Form */}
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

export default EditPost;
