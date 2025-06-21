import React from 'react';

const ModalDelete = ({ 
    show, 
    id, 
    movieTitle, 
    onCancel, 
    onDelete }) => {

  if (!show) return null;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">

        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Eliminando</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">
            {movieTitle? <span>¿Desea eliminar <b>{movieTitle}</b>?</span>:
            <span>¿Desear eliminar la funcion?</span>}
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
