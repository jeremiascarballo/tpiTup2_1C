
import { useState } from "react";
import { useNavigate } from "react-router";
import AuthConteiner from "./authConteiner";



const Register = () => {
    const [nameUser, setNameUser] = useState("");;
    const [emailUser, setEmailUser] = useState("");
    const [passwordUser, setPasswordlUser] = useState("");




    const navigate = useNavigate();


    const handleEmailChange = (event) => {
        setEmailUser(event.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordlUser(e.target.value)
    }

    const handleNameChange = (event) => {
        setNameUser(event.target.value);
    }

    const handleRedirectLogin = () => {

        navigate("/login");
    }

    return (
        <AuthConteiner>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Ingresar nombre"
                    className="w-full p-2 rounded border border-gray-300"
                    onChange={handleNameChange}
                    value={nameUser}
                />
            </div>

            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Ingresar email"
                    className="w-full p-2 rounded border"
                    onChange={handleEmailChange}
                    value={emailUser}
                />
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    placeholder="Ingresar contraseña"
                    className="w-full p-2 rounded border border-gray-300"
                    onChange={handlePasswordChange}
                    value={passwordUser}
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                    Registrarse
                </button>
            </div>
            <div className="mt-[2rem] flex flex-col">
                <p className="justify-center">¿Ya tienes cuenta?</p>
                <button
                    type="submit"
                    className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                    onClick={handleRedirectLogin} >
                    Ingresar
                </button>
            </div>
        </AuthConteiner>
    );
}
export default Register