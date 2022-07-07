import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaCheck } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import firestoreDB, { storage, auth } from '../firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function Upload() {
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    private: false,
    image: {},
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // 1. Create a reference to the full path of the file, including the file name in firebase storage.
      const fileRef = ref(storage, `images/${formData.image.name}-${uuidv4()}`);

      // 2. Upload Image and get the image url
      const snapshot = await uploadBytes(fileRef, formData.image);
      const imageUrl = await getDownloadURL(snapshot.ref);
      setImageUrl(imageUrl);

      // 3. Create the Document to be uploaded
      const docData = {
        title: formData.title,
        description: formData.description,
        private: formData.private,
        timestamp: serverTimestamp(),
        userId: auth.currentUser.uid,
        username: auth.currentUser.displayName,
        imageUrl,
      };

      // 4. Creating Reference to the posts collection on fs
      const collectionRef = collection(firestoreDB, 'posts');

      // 5. Uploading Document with auto-generated id to the fs
      await addDoc(collectionRef, docData);

      setLoading(false);
      // navigate('/');
      toast.success('image posted successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onFileUpload = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    const url = URL.createObjectURL(e.target.files[0]);
    setImagePreview(url);
  };

  const onPrivateSelect = (e) => {
    const value = e.target.value === 'true' ? true : false;
    setFormData((prev) => ({ ...prev, private: value }));
  };

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-200">
      <div className="flex max-w-6xl bg-beige-100 shadow-lg">
        {/* DRAG AND DROP ZONE / PREVIEW ZONE */}

        <div className="bg-brick-pattern hidden md:flex md:flex-col md:items-center md:justify-center w-[28rem] md:space-y-2 ">
          <p className="text-beige-100 font-semibold text-5xl tracking-wider">
            Create a New
          </p>
          <p className="text-beige-100 font-semibold text-5xl tracking-wider">
            Post
          </p>
        </div>

        {/* CONTENT */}
        <div className="px-8 pt-10 pb-9 w-80">
          <h1 className="text-3xl font-semibold mb-7">Upload</h1>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-10 mb-5">
              {/* FIXME: ADDITIONAL GAP APPEARS AFTER MD */}
              {/* img preview */}
              {/* {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={formData.image.name}
                  className="w-64 md:hidden md:w-0 md:h-0"
                />
              ) : null} */}

              <input
                onChange={onInputChange}
                value={formData.email}
                id="title"
                type="text"
                placeholder="Title"
                className="py-1 text-sm bg-beige-100 border-b border-pTeal-200  focus:outline-none"
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

            {/* Upload File */}
            <div>
              <label
                htmlFor="image"
                className="group text-center w-full mb-4 bg-gradient-to-r from-gray-500 to-gray-400 text-white uppercase text-base py-1 tracking-wider shadow-md hover:brightness-105 active:shadow-sm duration-300 inline-block cursor-pointer"
              >
                <div className="flex items-center justify-center space-x-4">
                  {imagePreview ? (
                    <>
                      <span>Image Uploaded</span>
                      <FaCheck className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <span>upload image</span>
                      <FaCloudUploadAlt className="w-5 h-5" />
                    </>
                  )}
                </div>
              </label>
              <input
                onChange={onFileUpload}
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                required
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
              Save and Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;
