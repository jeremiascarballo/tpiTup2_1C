

const UserItem = ({ id, name, email, role }) => {
    return (
      <div className="border border-gray-300 rounded-xl shadow-sm p-4 bg-white mb-4">
        <p className="text-gray-800 font-semibold">ID: {id}</p>
        <p className="text-gray-700">Nombre: {name}</p>
        <p className="text-gray-700">Email: {email}</p>
        <p className="text-gray-600 italic">Rol: {role}</p>
      </div>
    );
  };

export default UserItem