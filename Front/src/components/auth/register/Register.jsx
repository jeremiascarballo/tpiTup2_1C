
import { useState } from "react";
import { useNavigate } from "react-router";
import AuthConteiner from "../authConteiner";
import { validateString, validateEmail, validatePassword } from "../auth.helpers";
import { registerUser } from "./Register.services";
import { errorToast, successToast } from "../../../utils/notifications";



const Register = () => {
    const [nameUser, setNameUser] = useState("");;
    const [emailUser, setEmailUser] = useState("");
    const [passwordUser, setPasswordlUser] = useState("");
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
    });

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

    const handleRegister = (event) => {
        event.preventDefault();

        if (!nameUser.length || !validateString(nameUser, null, 13)) {
            errorToast(`Nombre de usuario incorrecto`);
            setErrors({ ...errors, nameUser: true });
            return;
        }
        if (!emailUser.length || !validateEmail(emailUser)) {
            alert(`Email incorrecto`);
            setErrors({ ...errors, emailUser: true });
            return;
        }

        else if (!passwordUser.length || !validatePassword(passwordUser, 7, null, true, true)) {
            errorToast(`Password incorrecto`);
            setErrors({ ...errors, passwordUser: true });
            return;
        }

        setErrors({ emailUser: false, passwordUser: false })

        registerUser(
            nameUser,
            emailUser,
            passwordUser,
            () => {
                successToast("¡Usuario creado exitosamente!");
                navigate("/login");
            },
            err => errorToast(err.message)
        )

    }


    const handleRedirectLogin = () => {

        navigate("/login");
    }

    return (
        <AuthConteiner>
            <form onSubmit={handleRegister}>
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
            </form>
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