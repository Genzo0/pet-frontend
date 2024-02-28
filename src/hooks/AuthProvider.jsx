import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { envVariable } from "../config/env";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [error, setError] = useState("");

  const login = async (data) => {
    try {
      const response = await fetch(`${envVariable.API_URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.status === 200) {
        setToken(res.token);
        setUserId(res.id);
        setError("");
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.id);
        navigate("/");
        return;
      } else {
        setError(res.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
      throw new Error(res.error);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setToken("");
    setUserId("");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, error, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
