import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api.js";
import { trackEvent } from "../analytics.js";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const save = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (email, password) => {
    save(await loginUser(email, password));
    trackEvent("login", { method: "email" });
  };
  const register = async (name, email, password) => {
    save(await registerUser(name, email, password));
    trackEvent("sign_up", { method: "email" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}