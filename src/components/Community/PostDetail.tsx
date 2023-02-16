import { dbService } from "@/firebase";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { isArrayLike } from "lodash";
import { EffectCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToday } from "../DateCal";

export default function PostDetail() {
  const { post_id }: any = useParams();
  const [detail, setDetail] = useState([] as any);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([] as any | undefined);
  const [likeIcon, setLikeIcon] = useState("♡");
  const [likeData, setLikeData] = useState("");
  const nickname = getAuth().currentUser?.displayName;
  const id = getAuth().currentUser?.uid;
  const isMember = getAuth().currentUser;
  const navigate = useNavigate();
  const likeList: any[] = detail
    .filter((item: any) => item.id === post_id)
    .map((item: any) => item.like)[0];

  const likeHandler = () => {
    if (likeIcon === "♡") {
      setLikeIcon("♥");
    } else if (likeIcon === "♥") {
      setLikeIcon("♡");
    }
  };

  useEffect(() => {
    try {
      const docRef = doc(dbService, "community", post_id);
      if (likeIcon === "♥") {
        updateDoc(docRef, {
          like: arrayUnion(nickname),
        });
      } else if (likeIcon === "♡") {
        updateDoc(docRef, {
          like: arrayRemove(nickname),
        });
      }
    } catch (e) {}
  }, [likeIcon]);

  useEffect(() => {
    const q = query(collection(dbService, "community"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setDetail(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onDelete = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    const deletePost = doc(dbService, "community", post_id);
    if (ok) {
      await deleteDoc(deletePost);
      navigate("/community");
    }
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const onComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isMember === null) {
      alert("Only members can write comments.");
      navigate("/community");
    } else {
      await addDoc(collection(dbService, "comment"), {
        userId: id,
        nickname: nickname,
        comment: comment,
        createdAt: getToday(),
        unique_id: post_id,
      });
      setComment("");
    }
  };

  useEffect(() => {
    const q = query(collection(dbService, "comment"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setComments(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="xl:max-w-[1280px] xl:mx-auto p-10">
        <div className="text-sm align-midlle">
          <p className="font-bold text-2xl mb-3">Post Details Page</p>
          <div className="flex justify-between">
            <p>
              - If you like the post, please press the heart. The heart will turn red.
            </p>
          </div>
          {detail
            ?.filter((item: any) => item.id.includes([post_id]))
            .map((item: any) => (
              <>
                <div
                  key={item.id}
                  className="flex flex-col bg-cine-yellow text-cine-navy gap-2 mt-5"
                >
                  <div className="flex bg-gray-300/50 h-15 p-5 items-center font-bold text-xl justify-between">
                    Title : {item.title}
                    <button type="submit" onClick={onDelete} className="text-cine-navy">
                      <TrashIcon className="nav-btn w-8 h-8" />
                    </button>
                  </div>
                  <div className="flex bg-gray-300/50 h-10 p-5 items-center justify-between">
                    <div>Writer : {item.nickname}</div>
                    <div>Upload Time : {item.createdAt}</div>
                  </div>
                  <div className="flex bg-gray-300/50 h-10 mb-2 p-5 items-center">
                    Movie : {item.movie}
                  </div>
                  <div className="p-5 h-10 text-2xl font-bold mb-3">- Content</div>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.text }}
                    className="flex bg-gray-300/80 h-auto mb-2 p-5 items-center"
                  ></div>
                </div>
                <div className="flex mt-3 items-center">
                  <button
                    type="submit"
                    onClick={likeHandler}
                    className="text-2xl text-red-600 pb-2"
                  >
                    {likeIcon}
                  </button>
                  <div className="text-lg ml-3 pb-1">{likeList.length}</div>
                </div>
              </>
            ))}
        </div>
      </div>
      <div className="xl:max-w-[1280px] xl:mx-auto p-10">
        <p className="font-bold text-2xl mb-3">Write a Comment</p>
        <form onSubmit={onComment}>
          <input type="text" onChange={onChangeComment} value={comment} />
          <button type="submit" className="btn mr-5">
            Enter
          </button>
        </form>
        <div className="bg-cine-yellow text-cine-navy text-sm">
          {comments
            .filter((item: any) => item.unique_id.includes(post_id))
            .map((item: any) => (
              <>
                <div key={item.id} className="px-5 pb-3">
                  {/* {item.userId === null} ? */}
                  <div className="flex items-end">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    {item.nickname}
                  </div>
                  {/* :
                  <div>
                    <EyeIcon className="w-4 h-4" />
                    "비회원"
                  </div> */}
                </div>
                <div className="flex border-b h-20 px-4 pt-2 justify-between bg-gray-300/50">
                  <div>{item.comment}</div>
                  <div>{item.createdAt}</div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
function firestore() {
  throw new Error("Function not implemented.");
}
