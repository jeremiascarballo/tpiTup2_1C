import { useState } from "react";
import { validateString, validateEmail, validatePassword } from "../../../auth/auth.helpers";
import { errorToast, successToast } from "../../../../utils/notifications";

const AddUser = ({ fetchUserData, isOpen }) => { 
    const [name, setName] = useState("");;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("cliente");
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
    });


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleRoleUserChange = (event) => {
        setRole(event.target.value);
    }

    const handleClickIsOpen = () => {
        isOpen();  
    }

    const handleRegister = (event) => {
        event.preventDefault();

        if (!name.length || !validateString(name, null, 13)) {
            errorToast(`Nombre de usuario incorrecto`);
            setErrors({ ...errors, name: true });
            return;
        }
        if (!email.length || !validateEmail(email)) {
            alert(`Email incorrecto`);
            setErrors({ ...errors, email: true });
            return;
        }

        else if (!password.length || !validatePassword(password, 7, null, true, true)) {
            errorToast(`Password incorrecto`);
            setErrors({ ...errors, password: true });
            return;
        }

        setErrors({ email: false, password: false })

        fetch(`${import.meta.env.VITE_API_URL}/register`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ name, email, password, role})
        })
            .then(async res => {
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || "Algo ha salido mal");
                }
    
                return res.json();
            })
            .then(() => {
                successToast("¡Usuario creado exitosamente!");
                setName("");
                setEmail(""); 
                setPassword("");
                setRole('cliente');
                fetchUserData();
                handleClickIsOpen();
            })
            .catch((err) => {
                err => errorToast(err.message)
            });
        };

    return (
        <>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Ingresar nombre"
                        className="w-full p-2 rounded border border-gray-300"
                        onChange={handleNameChange}
                        value={name}
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Ingresar email"
                        className="w-full p-2 rounded border"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Ingresar contraseña"
                        className="w-full p-2 rounded border border-gray-300"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                </div>
                <div className="mb-4">
                    <select 
                    name="select"
                    onChange={handleRoleUserChange}
                    value={role}
                    >
                        <option value="cliente">Cliente</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">SuperAdmin</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                    >
                        Agregar
                    </button>
                </div>
            </form>
        </>
    );
}

export default AddUser;