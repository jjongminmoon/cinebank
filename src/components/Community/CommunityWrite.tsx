import { dbService } from "@/firebase";
import { useState } from "react";
import { collection, addDoc, getCountFromServer } from "firebase/firestore";
import { AuthErrorCodes, getAuth } from "firebase/auth";
import { isRouteErrorResponse, useNavigate } from "react-router-dom";
import { getToday } from "../DateCal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { isError } from "lodash";

export default function CommunityWrite() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState("");
  const [view, setView] = useState(0);
  const [like, setLike] = useState(0);
  const nickname = getAuth().currentUser?.displayName;
  const user_id = getAuth().currentUser?.uid;
  const navigate = useNavigate();

  const onChangeMovie = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(e.target.value);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const coll = collection(dbService, "community");
    const snapshot = await getCountFromServer(coll);

    await addDoc(collection(dbService, "community"), {
      number: snapshot.data().count + 1,
      like: like,
      view: view,
      userId: user_id,
      nickname: nickname,
      movie: movie,
      title: title,
      text: content,
      createdAt: getToday(),
    });
    setContent("");
    navigate("/community");
  };

  const onCancel = () => {
    navigate("/community");
  };

  return (
    <>
      <div className="xl:max-w-[1280px] xl:mx-auto p-10">
        <p className="font-bold text-2xl mb-3">Description</p>
        <p>- Please select a movie to write a review.</p>
        <p>- Please write a review of the movie you saw.</p>
        <p>
          - If you have a proof photo of watching the movie, please attach it together.
        </p>
        <form onSubmit={onPost}>
          <div className="flex justify-between mt-10">
            <div className="flex">
              <p className="mr-5">Seleted Movie :</p>
              <input
                type="text"
                onChange={onChangeMovie}
                className="w-80 pl-5 rounded-xl text-cine-navy"
              />
            </div>
            <div className="flex">
              <button type="submit" className="btn mr-5">
                Post
              </button>
              <button type="button" onClick={onCancel} className="btn">
                Cancel
              </button>
            </div>
          </div>
          <input
            type="text"
            onChange={onChangeTitle}
            className="w-full h-8 pl-4 mt-5 text-sm text-cine-navy bg-cine-yellow border"
            placeholder="Please enter a title."
          />
          <div className="bg-cine-yellow text-cine-navy min-h-screen mt-8 border">
            <ReactQuill
              onChange={setContent}
              value={content}
              modules={modules}
              placeholder="Please enter the content."
            />
          </div>
        </form>
      </div>
    </>
  );
}
