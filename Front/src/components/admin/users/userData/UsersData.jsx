import { useContext, useEffect, useState } from "react"

import { AuthContext } from "../../../../services/authContext/AuthContext";

import UserItem from "../userItem/UserItem";
import ChangeRoleUser from "../../changeRoleUser/ChangeRoleUser";


const UsersData = () => {

    const { userRole, userId } = useContext(AuthContext);

    const [users, setUsers] = useState([])

    const [isOpen, setIsOpen] = useState(false);
    const [openUserId, setOpenUserId] = useState(null);

    useEffect(() => {
        if (userRole === 'superadmin') {

            const token = localStorage.getItem("user-token");

            fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then((data) => {
                    setUsers(data);
                })
                .catch(err => console.error(err));
        }
    }, [userRole]);

    if (userRole != "superadmin") {
        return <p>No tiene los permisos necesarios</p>
    }

    const handleClick = (id) => {
        setOpenUserId(prevId => (prevId === id ? null : id));
    };


    return (
        <div>
            <div className="mb-4">
                <h2 className="text-8xl font-bold border-b-2 border-white p-5 text-center">
                    USUARIOS
                </h2>
            </div>
            {users.map((user) => (
                <div key={user.id}>
                    <UserItem
                        id={user.id}
                        name={user.name}
                        email={user.email}
                        role={user.role}
                        handleClick={handleClick}
                        isOpen={openUserId === user.id}
                    />
                </div>
            ))}
        </div>)

}

export default UsersData;
