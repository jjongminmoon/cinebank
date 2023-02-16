import { auth, loginGoogle } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPwd(e.target.value);
  };

  const handleClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCreate((pre) => !pre);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isCreate) {
      createUserWithEmailAndPassword(auth, email, pwd)
        .then(() => {
          alert("회원 가입 완료.");
          navigate("/");
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      signInWithEmailAndPassword(auth, email, pwd)
        .then(() => {
          navigate("/");
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  const loginSuccess = () => {
    navigate("/");
  };

  const handleGoogleLogin = () => {
    loginGoogle().then((result) => {
      console.log(result);
      const user = result.user;
      loginSuccess();
    });
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="flex w-full py-48 items-center justify-center"
      >
        <ul className="mb-12 mr-5">
          <li className="mb-5">ID</li>
          <li>Password</li>
        </ul>
        <div className="flex flex-col text-black">
          <input type="text" onChange={handleEmail} value={email} className="pl-2 mb-5" />
          <input type="password" onChange={handlePwd} value={pwd} className="pl-2" />
          <div className="mt-5 text-cine-yellow">
            <button type="submit" className="btn mr-5">
              {isCreate ? "Join" : "Login"}
            </button>
            <button type="button" onClick={handleClickCreate} className="btn mr-5">
              {isCreate ? "Cancel" : "Join"}
            </button>
            <button type="button" onClick={handleGoogleLogin} className="btn">
              Google
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
