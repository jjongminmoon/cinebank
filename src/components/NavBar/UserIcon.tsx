import { AuthContext } from "@/contexts/AuthContext";
import { auth } from "@/firebase";
import { UserCircleIcon, HomeModernIcon } from "@heroicons/react/20/solid";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserIcon() {
  const userInfo = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <>
      <Link
        to="/profile"
        className="nav-btn rounded w-10 h-12 sm:w-12 mr-5 hover:bg-gray-600"
      >
        <HomeModernIcon className="h-8 w-8" />
      </Link>
      {userInfo ? (
        <div>
          <button type="button" onClick={handleLogout} className="btn">
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link
            to="/user"
            className="nav-btn rounded w-10 h-12 sm:w-12 hover:bg-gray-600"
          >
            <UserCircleIcon className="h-8 w-8" />
          </Link>
        </>
      )}
    </>
  );
}
