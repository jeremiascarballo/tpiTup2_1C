import { useState } from "react"
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

const getValidToken = () => {
  
  const saved = localStorage.getItem("user-token");
  if (!saved) return null;
  try {
      const decoded = jwtDecode(saved);

      if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("user-token");
          return null;
      }
      return saved;
  } catch {
      return null;
  }
};

const tokenSaved = getValidToken(); 

const AuthContextProvider = ({ children }) => {

    const [token, setToken] = useState(tokenSaved);
    
    const [userRole, setUserRole] = useState(() => {
      if (!tokenSaved) return null;
      try {
        const decoded = jwtDecode(tokenSaved);
        return decoded.role;
      } catch {
        return null;
      }
    });

    const [userId, setUserId] = useState(() => {
        if (!tokenSaved) return null;
        try {
          const decoded = jwtDecode(tokenSaved);
          return decoded.id;
        } catch (error) {
          return null;
        }
      });

    const handleUserLogin = (newToken) => {
        localStorage.setItem("user-token", newToken);
        setToken(newToken)
        try {
            const decoded = jwtDecode(newToken);
            setUserId(decoded.id);
            setUserRole(decoded.role);
          } catch (error) {
            setUserId(null);
            setUserRole(null);
          }
    }

    const handleUserLogout = () => {
        localStorage.removeItem("user-token");
        setToken("");
        setUserId(null);
        setUserRole(null);
    }


    return (
        <AuthContext.Provider value={{ userRole, token, userId, handleUserLogin, handleUserLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider