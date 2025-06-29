import { useContext, useEffect, useState } from "react"

import { AuthContext } from "../../../../services/authContext/AuthContext";
import { successToast,errorToast } from "../../../../utils/notifications";

import ModalDelete from "../../../ui/modalDelete/ModalDelete";

import UserItem from "../userItem/UserItem";

import AddUser from "../addUser/AddUser";

const UsersData = () => {

    const { userRole } = useContext(AuthContext);

    const [users, setUsers] = useState([])

    const [openUserId, setOpenUserId] = useState(null);

    const [isOpenAddUser, setIsOpenAddUser] = useState(false)

    const [showModal, setShowModal] = useState(false);
    const [selectNameUser, setSelectNameUser] = useState(null);
    const [selectIdUser, setSelectIdUser] = useState(null);

    const onDeleteUser = (id) => {
        fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then(res => {
            if (!res.ok) throw new Error("Error al eliminar");
            return res.json();
          })
          .then(() => {
            successToast(`Se eliminó al usuario con ID ${id}`);
            setUsers(prevUsers =>
              prevUsers.filter(user => user.id !== id)
            );
          })
          .catch(err => {
            errorToast("Error al eliminar el usuario:", err);
          });
      };

    const handleOpenModal = (name, id) => {
        setSelectNameUser(name);
        setSelectIdUser(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectNameUser(null);
        setOpenUserId(null);
    };

    const handleConfirmDelete = (id) => {
        onDeleteUser(id);
        handleCloseModal();
    };


    const fetchUserData = () => {
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
    };

    useEffect(() => {
        if (userRole === 'superadmin') {
            fetchUserData();
        }
    }, [userRole]);

    if (userRole != "superadmin") {
        return <p>No tiene los permisos necesarios</p>
    }

    const handleClick = (id) => {
        setOpenUserId(prevId => (prevId === id ? null : id));
    };

    const handleClickAddUser = () => {
        setIsOpenAddUser(!isOpenAddUser);
    };

    return (<>
    <ModalDelete
                show={showModal}
                id={selectIdUser}
                name={selectNameUser}
                onCancel={handleCloseModal}
                onDelete={handleConfirmDelete}
            />
        <div>
            <div className="mb-4">
                <h2 className="text-8xl font-bold border-b-2 border-white p-5 text-center">
                    USUARIOS
                </h2>
            </div>
            <div className="flex flex-col items-center gap-4 mb-6">
                {isOpenAddUser && <AddUser fetchUserData={fetchUserData} isOpen={handleClickAddUser} />}

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-blue-700 transition duration-200"
                    onClick={handleClickAddUser}
                >
                    {!isOpenAddUser ? 'Agregar usuario' : 'Cerrar formulario'}
                </button>
            </div>


            {users.map((user) => (
                <div key={user.id}>
                    <UserItem
                        id={user.id}
                        name={user.name}
                        email={user.email}
                        role={user.role}
                        userRoleToken={userRole}
                        handleClick={handleClick}
                        fetchUserData={fetchUserData}
                        isOpen={openUserId === user.id}
                        handleOpenModal={handleOpenModal}
                    />
                </div>
            ))}
        </div>
        </>)

}

export default UsersData;
