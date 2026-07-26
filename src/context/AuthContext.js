import React, { createContext, useContext, useState } from "react";

const defaultAuth = { isLoggedIn: false, userId: "", name: "", email: "", role: "user" };
const AuthContext = createContext({ auth: defaultAuth, login: () => {}, signup: () => {}, logout: () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("travelgo_auth");
    if (saved) return JSON.parse(saved);
    const token = localStorage.getItem("usertoken");
    const userId = localStorage.getItem("user_id");
    if (token) {
      return { isLoggedIn: true, userId: userId || "u1", name: "User", email: "", role: "user" };
    }
    return defaultAuth;
  });

  const persist = (state) => { setAuth(state); localStorage.setItem("travelgo_auth", JSON.stringify(state)); };

  const login = (email, password, role = "user", customData = {}) => {
    const userName = customData.name || "User";
    const userId = customData.userId || "u1";
    persist({ isLoggedIn: true, userId, name: userName, email, role: "user" });
  };

  const signup = (name, email, phone, password, role = "user") => {
    persist({ isLoggedIn: true, userId: "new_" + Date.now(), name, email, role: "user" });
  };

  const logout = () => {
    localStorage.removeItem("travelgo_auth");
    localStorage.removeItem("usertoken");
    localStorage.removeItem("user_id");
    setAuth(defaultAuth);
  };

  return <AuthContext.Provider value={{ auth, login, signup, logout }}>{children}</AuthContext.Provider>;
};

