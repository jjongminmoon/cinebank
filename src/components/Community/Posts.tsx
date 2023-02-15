import { dbService } from "@/firebase";
import { collection, doc, getCountFromServer, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Posts({ posts }: any) {
  return (
    <div className="text-sm align-middle">
      {posts &&
        posts.map((item: any) => (
          <Link to={`/postDetail/${item.id}`} key={item.number}>
            <div className="w-full flex gap-10 mb-4">
              <div className="flex pl-5 w-20 justify-center">{item.number}</div>
              <div className="w-60">{item.title}</div>
              <div className="w-60">{item.movie}</div>
              <div className="w-40">{item.nickname}</div>
              <div className="w-40">{item.createdAt}</div>
            </div>
          </Link>
        ))}
    </div>
  );
}
