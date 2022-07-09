import { useCallback, useEffect, useState, useRef } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import firestoreDB from '../firebase.config';
import Loader from '../components/Loader';
import PostItem from './PostItem';

function PostList() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [lastItem, setLastItem] = useState(null);
  const fetched = useRef(false);

  const fetchPosts = useCallback(async (qb) => {
    // Create collection ref
    const postsRef = collection(firestoreDB, 'posts');
    // Creating Query
    const q = query(postsRef, ...qb);

    // Getting data from firebase
    const querySnap = await getDocs(q);

    // Set last fetched item
    const lastFetchedItem = querySnap.docs[querySnap.docs.length - 1];
    setLastItem(lastFetchedItem);

    // Adding data to posts array and saving to states
    const postsArr = [];
    querySnap.forEach((doc) => postsArr.push({ id: doc.id, data: doc.data() }));

    setPosts((prev) => [...prev, ...postsArr]);
    setLoading(false);
  }, []);

  // FETCH POSTS ON START
  useEffect(() => {
    if (!fetched.current) {
      fetchPosts([
        where('private', '==', false),
        orderBy('timestamp', 'desc'),
        limit(10),
      ]);
    }
    return () => (fetched.current = true);
  }, [fetchPosts]);

  // LOAD MORE FUNCTIONALITY
  const loadMore = () => {
    fetchPosts([
      where('private', '==', false),
      orderBy('timestamp', 'desc'),
      limit(10),
      startAfter(lastItem),
    ]);
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige-200">
      <div className="grid grid-cols-1 gap-y-14 gap-x-10 m-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl bg-beige-200">
        {posts.map((post) => (
          <PostItem key={post.id} post={post.data} id={post.id} />
        ))}
      </div>

      {lastItem ? (
        <button
          onClick={loadMore}
          className="text-center px-4 py-2 my-7 bg-gradient-to-r from-pTeal-100 to-teal-300 text-white uppercase text-base  tracking-wider shadow-md hover:brightness-105 active:shadow-sm duration-300"
        >
          Load more
        </button>
      ) : null}
    </div>
  );
}

export default PostList;
