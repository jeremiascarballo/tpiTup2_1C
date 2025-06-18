import {errorToast, successToast} from '../../../utils/notifications'

export const registerUser = (name, email, password) => {
    fetch(`${import.meta.env.VITE_API_URL}/register`, {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ name, email, password })
    })
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Algo ha salido mal");
            }

            return res.json();
        })
        .then(() => {
            successToast("Usuario registrado correctamente");
        })
        .catch((err) => {
            errorToast(err.message || "Ocurrió un error al registrar");
        });
    };
