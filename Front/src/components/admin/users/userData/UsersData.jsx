import { useContext, useEffect, useState } from "react"

import { AuthContext } from "../../../../services/authContext/AuthContext";

import UserItem from "../userItem/UserItem";


const UsersData = () => {

    const { userRole, userId } = useContext(AuthContext);

    const [users, setUsers] = useState([])

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

    return (<div>
        {users.map((user) => (
            <UserItem
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                role={user.role}
            />
        ))}
    </div>)

}

export default UsersData;
