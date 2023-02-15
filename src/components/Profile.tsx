import { dbService } from "@/firebase";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState("");
  const [profile, setPorfile] = useState([] as any);
  const user: any = getAuth().currentUser;
  const nickname = getAuth().currentUser?.displayName;
  const uid = getAuth().currentUser?.uid;
  const email = getAuth().currentUser?.email;
  const navigate = useNavigate();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleProfile = (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        alert("닉네임 변경 완료");
        navigate("/");
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container xl:max-w-[1280px] mx-auto">
      <div className="flex flex-col justify-center items-center w-full p-40 gap-3">
        <div>- User IDentifier : {uid}</div>
        <div>- User Nickname : {nickname}</div>
        <div>- User E-mail : {email}</div>
      </div>
      <form onSubmit={handleProfile} className="flex w-full items-center justify-center">
        <ul className="mb-12 mr-5">
          <li className="mb-5">Change NickName : </li>
        </ul>
        <div className="flex flex-col text-black">
          <input type="text" onChange={handleName} value={name} className="pl-2 mb-5" />
          <div className="mt-5 text-cine-yellow">
            <button type="submit" className="btn mr-5">
              Done
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
