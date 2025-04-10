import { createContext, useContext, useState } from "react";
import axios from "axios";

const domain =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3000/";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const storedToken = localStorage.getItem("access_token");
  const storedUsername = localStorage.getItem("username");

  const [user, setUser] = useState({
    username: storedUsername || "",
    isLoggedIn: !!storedToken,
    access_token: storedToken,
  });

  async function register({ username, email, password }) {
    try {
      const res = await axios.post(`${domain}auth/register`, {
        username,
        email,
        password,
      });
      const { user: userData, access_token } = res.data;
      setUser({
        username: userData.username,
        isLoggedIn: true,
        access_token,
      });
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("username", userData.username);

      return true;
    } catch (error) {
      console.error("Register error:", error?.response?.data || error.message);
      return false;
    }
  }

  async function login({ email, password }) {
    try {
      const res = await axios.post(`${domain}auth/login`, {
        email,
        password,
      });
      const { user: userData, access_token } = res.data;
      setUser({
        username: userData.username,
        isLoggedIn: true,
        access_token,
      });
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("username", userData.username);
      return true;
    } catch (error) {
      console.error("Login error:", error?.response?.data || error.message);
      return false;
    }
  }

  function logout() {
    setUser({ username: "", isLoggedIn: false, access_token: null });
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
  }

  return (
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
