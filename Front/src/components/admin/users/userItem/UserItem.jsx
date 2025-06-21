import ChangeRoleUser from '../../changeRoleUser/ChangeRoleUser'

const UserItem = ({ id, name, email, role, handleClick, isOpen}) => {

    const handleClickItem = () =>{
      handleClick(id);
    }

    return (
      <div className="border border-gray-300 rounded-xl shadow-sm p-4 bg-white mb-4 mx-5">
        <p className="text-gray-800 font-semibold">ID: {id}</p>
        <p className="text-gray-700">Nombre: {name}</p>
        <p className="text-gray-700">Email: {email}</p>
        <p className="text-gray-600 italic">Rol: {role}</p>
        {<button 
        className="bg-gray-800 text-white p-1 border border-blue-500 rounded-lg m-1 hover:bg-gray-600"
        onClick={handleClickItem}
        >{!isOpen?'Cambiar Role': 'Cancelar'}
        </button>}
        {isOpen && <ChangeRoleUser userName={name} userRole={role} userId={id}/>}
      </div>
    );
  };

export default UserItem