import { useState, useRef, useContext} from "react";
import { useNavigate } from "react-router";

import { errorToast } from "../../../utils/notifications";

import NavBar from "../../movies/navBar/NavBar";
import { loginUser } from "./Login.services";
import { AuthContext } from "../../../services/authContext/AuthContext";
import AuthConteiner from "../authConteiner";



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { handleUserLogin } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors(prevErrors => ({
      ...prevErrors,
      email: false
    }));
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setErrors(prevErrors=>({
      ...prevErrors,
      password: false
    }))
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.length) {
        errorToast("¡El email está vacío!");
        emailRef.current.focus();
        setErrors(prevErrors => ({
            ...prevErrors,
            email: true,
        }))
        return;
    }

    if (!passwordRef.current.value.length) {
        errorToast("¡El password esta vacío!");
        passwordRef.current.focus();
        setErrors(prevErrors => ({
            ...prevErrors,
            password: true,
        }))
        return;
    }

    loginUser({ email, password },
      (token) => {
          handleUserLogin(token);
          navigate('/home')
      },
      err => {
          errorToast(err.message)
      }

  )

}

  const handleRedirectRegister = () => {

    navigate("/register");
  }

  return (
    <AuthConteiner>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Ingresar email"
            className="w-full p-2 rounded border"
            onChange={handleEmailChange}
            value={email}
            ref={emailRef}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Ingresar contraseña"
            className="w-full p-2 rounded border border-gray-300"
            onChange={handlePasswordChange}
            value={password}
            ref={passwordRef}
          />
        </div>



        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Iniciar sesión
          </button>
        </div>
      </form>



      <div className="mt-[2rem] flex flex-col">
        <p className="justify-center">¿Aun no tienes cuenta?</p>
        <button
          type="submit"
          className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
          onClick={handleRedirectRegister} >
          Registrarse
        </button>
      </div>
    </AuthConteiner>
  );
}
export default Login