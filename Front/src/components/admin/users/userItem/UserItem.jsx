
import ChangeRoleUser from '../../changeRoleUser/ChangeRoleUser'

const UserItem = ({ 
  id, 
  name, 
  email, 
  role, 
  handleClick, 
  isOpen, 
  fetchUserData, 
  userRoleToken,
  handleOpenModal
}) => {

    const handleClickItem = () =>{
      handleClick(id);
    }

    return (
      <div className="border border-gray-300 rounded-xl shadow-sm p-4 bg-white mb-4 mx-5">
        <p className="text-gray-800 font-semibold">ID: {id}</p>
        <p className="text-gray-700">Nombre: {name}</p>
        <p className="text-gray-700">Email: {email}</p>
        <p className="text-gray-600 italic">Rol: {role}</p>
    
        <div className="flex flex-wrap gap-2 mt-4">
          <button 
            className="bg-gray-800 text-white px-3 py-1 rounded-lg border border-blue-500 hover:bg-gray-600 transition"
            onClick={handleClickItem}
          >
            {!isOpen ? 'Cambiar Rol' : 'Cancelar'}
          </button>
    
          <button
            onClick={() => handleOpenModal(name, id)}
            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
    
        {isOpen && (
          <ChangeRoleUser 
            userName={name} 
            userRole={role} 
            userId={id} 
            userRoleToken={userRoleToken} 
            fetchUserData={fetchUserData}
            handleClickItem={handleClickItem}
          />
        )}
      </div>
    );
  }

export default UserItem