import { useState, useRef } from "react";
import { useNavigate } from "react-router";


import AuthConteiner from "./authConteiner";



const Login = () => {

  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordlUser] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  const emailUserRef = useRef(null);
  const passwordUserRef = useRef(null);

  const navigate = useNavigate();


  const handleEmailChange = (event) => {
    setEmailUser(event.target.value);
    setErrors(prevErrors => ({
      ...prevErrors,
      email: false
    }));
  }

  const handlePasswordChange = (e) => {
    setPasswordlUser(e.target.value)
    setErrors(prevErrors=>({
      ...prevErrors,
      password: false
    }))
  }

  
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailUser.length) {
        alert("¡El email está vacío!");
        emailUserRef.current.focus();
        setErrors(prevErrors => ({
            ...prevErrors,
            email: true,
        }))
        return;
    }

    if (!passwordUserRef.current.value.length) {
        alert("¡El password esta vacío!");
        passwordUserRef.current.focus();
        setErrors(prevErrors => ({
            ...prevErrors,
            password: true,
        }))
        return;
    }


    /*{LoginUser}*/


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
            value={emailUser}
            ref={emailUserRef}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Ingresar contraseña"
            className="w-full p-2 rounded border border-gray-300"
            onChange={handlePasswordChange}
            value={passwordUser}
            ref={passwordUserRef}
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