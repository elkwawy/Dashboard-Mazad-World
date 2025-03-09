import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { path } from "@/constant/paths";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    if (user) {
      const userProfile = user || [];
      Cookies.set(path.user, JSON.stringify(userProfile));
    }
  }, [user]);

  useEffect(() => {
    const userCookie = Cookies.get(path.user);
    if (userCookie) {
      const parsedUser = JSON.parse(userCookie);
      setUser(parsedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
