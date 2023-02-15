import { dbService } from "@/firebase";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import Pagination from "./Pagination";

export default function Community() {
  const [posts, setPosts] = useState([] as any | undefined);
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerpage] = useState(10);

  const indexOfLast = page * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts: any) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  useEffect(() => {
    const q = query(collection(dbService, "community"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setPosts(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="xl:max-w-[1280px] xl:mx-auto p-10">
      <p className="font-bold text-2xl mb-3">The Movie Community</p>
      <div className="flex justify-between text-sm">
        <p>- Feel free to share stories about movies you've seen.</p>
        <Link to={"/write"}>
          <button type="button" className="btn text-md">
            Write
          </button>
        </Link>
      </div>
      <div className="flex flex-col border w-full mt-5 bg-cine-yellow text-cine-navy align-middle">
        <div className="bg-gray-300/50 align-middle flex gap-10 mb-3">
          <div className="pl-5 w-20">Number</div>
          <div className="w-60">Title</div>
          <div className="w-60">Movie</div>
          <div className="w-40">Writer</div>
          <div className="w-40">Upload Time</div>
        </div>
        <Posts posts={currentPosts(posts)} />
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        page={page}
        setPage={setPage}
      ></Pagination>
    </div>
  );
}
