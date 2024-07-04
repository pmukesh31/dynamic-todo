import { createContext, useContext, useState } from "react";
import { apiClient, executeBasicAuthentication } from "../api/ApiServices";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUserName] = useState(null);
  const [token, setToken] = useState(null);

  async function login(username, password) {
    const btaToken = "Basic " + window.btoa(username + ":" + password);

    try {
      const response = await executeBasicAuthentication(btaToken);
      if (response.status === 200) {
        setAuthenticated(true);
        setUserName(username);
        setToken(btaToken);

        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = btaToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
    }
    // if (username === "mukesh" && password === "123") {
    //   setAuthenticated(true);
    //   setUserName(username);
    //   return true;
    // } else {
    //   setUserName(null);
    //   return false;
    // }
  }

  function logout() {
    setToken(null);
    setAuthenticated(false);
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        login,
        logout,
        username,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
