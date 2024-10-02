import { createContext, useEffect, useState } from "react";
import { getMeFetch } from '../api/getMeFetch';

export const userContext = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("access");
      await login(token);
      setLoading(false);
    })();
  }, []);

  const login = async (token) => {
    try {
      const user = await getMeFetch(token);
      delete user.password;
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null); // Cambia a null en vez de false para mantener consistencia
    localStorage.clear();
  };

  const data = {
    user,
    setUser,
    login,
    logout,
  };

  if (loading) return null;

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
};

export default userContext;
