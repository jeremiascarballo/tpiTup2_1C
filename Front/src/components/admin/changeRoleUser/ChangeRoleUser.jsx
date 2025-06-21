import { useState } from "react";
import { successToast,errorToast } from "../../../utils/notifications";

const ChangeRoleUser = ({ userName, userRole, userId }) => {

    const [selectRole, setSelectRole] = useState('')

    const handleChangeSelectRole = (e) => {
        setSelectRole(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/users`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ userId, selectRole })
        })
            .then(async res => {
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || "Algo ha salido mal");
                }
                return res.json();
            })
            .then(() => {
                successToast("Role Cambiado con exito");
              })
              .catch((err) => {
                errorToast(err.message);
              });
    }

    return (
        <form onSubmit={onSubmit} className="p-2 border border-gray-200 rounded-lg max-w-xs">
                <p className="text-lg my-1"> El rol actual de {userName} es: <b>{userRole}</b></p>
                <p className="text-lg my-1"> Seleccione el nuevo rol</p>
                <select
                    name="select"
                    className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={selectRole}
                    onChange={handleChangeSelectRole}
                >
                    <option value='superadmin'>SuperAdmin</option>
                    <option value='admin'>Admin</option>
                    <option value='cliente'>Cliente</option>
                </select>
                <button
                type="submit"
                className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                CAMBIAR
              </button>
        </form>)
}



export default ChangeRoleUser;