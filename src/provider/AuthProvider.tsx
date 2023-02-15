import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebase";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const join = auth.onAuthStateChanged((fbUser) => {
      console.log(`구독실행`, fbUser);
      setUser(fbUser);
    });
    return join;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
