import React from 'react';
import { useEffect, useState } from 'react';
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';
import firestoreDB, { auth } from '../firebase.config';
import { useParams } from 'react-router-dom';
import UploadItem from './UploadItem';

function UploadList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      // Create collection ref
      const postsRef = collection(firestoreDB, 'posts');

      // Creating Query
      let q;

      if (auth.currentUser.uid === params.profileid) {
        // If the the user is visiting his profile
        q = query(
          postsRef,
          where('userId', '==', params.profileid),
          orderBy('timestamp', 'desc')
        );
      } else {
        // If someone else is visiting the profile
        q = query(
          postsRef,
          where('userId', '==', params.profileid),
          orderBy('timestamp', 'desc'),
          where('private', '==', false)
        );
      }

      // Getting data from firebase
      const querySnap = await getDocs(q);

      // Adding data to posts array and saving to states
      const postsArr = [];
      querySnap.forEach((doc) =>
        postsArr.push({ id: doc.id, data: doc.data() })
      );

      setPosts(postsArr);
      setLoading(false);
    };
    fetchPosts();
  }, [params.profileid]);

  if (loading) return <h1>Loading...</h1>;

  if (posts.length < 1) return <p className="mt-6">You have no posts yet</p>;

  return (
    <div className="self-start flex flex-col space-y-5 mt-10 w-full">
      {posts.map((post) => (
        <UploadItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default UploadList;
