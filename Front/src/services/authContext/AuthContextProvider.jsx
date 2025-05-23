import { useState } from "react"
import { AuthContext } from "./AuthContext";

const tokenSaved = localStorage.getItem("user-token");

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenSaved);

    const handleUserLogin = (newToken) => {
        localStorage.setItem("user-token", newToken);
        setToken(newToken)
    }

    const handleUserLogout = () => {
        localStorage.removeItem("user-token");
        setToken("");
    }


    return (
        <AuthContext value={{ token, handleUserLogin, handleUserLogout }}>
            {children}
        </AuthContext>
    )
}

export default AuthContextProvider