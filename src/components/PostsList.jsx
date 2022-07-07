import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import firestoreDB from '../firebase.config';
import Loader from '../components/Loader';
import PostItem from './PostItem';

function PostList() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // Create collection ref
      const postsRef = collection(firestoreDB, 'posts');
      // Creating Query
      const q = query(postsRef, where('private', '!=', true));
      const postsArr = [];
      // Getting data from firebase
      const querySnap = await getDocs(q);
      // Adding data to posts array and saving to states
      querySnap.forEach((doc) =>
        postsArr.push({ id: doc.id, data: doc.data() })
      );
      setPosts(postsArr);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex items-center md:items-start justify-center min-h-screen bg-beige-200">
      <div className="grid grid-cols-1 gap-y-14 gap-x-10 m-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl bg-beige-200">
        {posts.map((post) => (
          <PostItem key={post.id} post={post.data} id={post.id} />
        ))}
      </div>
    </div>
  );
}

export default PostList;
