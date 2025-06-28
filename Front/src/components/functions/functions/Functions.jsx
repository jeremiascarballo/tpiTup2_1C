import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useFormatDate } from "../../../hooks/useFormatDate/useFormatDate";

import FunctionItem from "../functionItem/FunctionItem";
import ModalDelete from "../../ui/modalDelete/ModalDelete";
import { AuthContext } from "../../../services/authContext/AuthContext";


const Functions = ({ functionsCinema, id, movie, onDeleteFunction }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedFunctionId, setSelectedFunctionId] = useState(null);

  const { userRole } = useContext(AuthContext);

  const handleOpenModal = (id, title) => {
    setSelectedFunctionId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFunctionId(null);
  };

  const handleConfirmDelete = (id) => {
    onDeleteFunction(id);
    handleCloseModal();
  };


  const navigate = useNavigate();

  const handleClick = (movieTitle, functionId, movieId , dateFunction, totalSeats, availableSeats ) => {

    navigate('/purchase', {
      state: {
        movieTitle,
        functionId,
        movieId,
        dateFunction,
        totalSeats,
        availableSeats,
      },
    });

  }

  const functionsMapped = functionsCinema
  .filter(f => f.movie_id == id)
  .map(funct => {
    const formatDate = useFormatDate(funct.date);

    return (
      <div key={funct.id} className="relative">
        <div>
            <FunctionItem
              handleClick={handleClick}
              movieTitle={movie.title}
              functionId={funct.id}
              movieId={funct.movie_id}
              dateFunction={formatDate}
              totalSeats={funct.total_seats}
              availableSeats={funct.available_seats}
            />
        </div>

        {(userRole === 'admin' || userRole === 'superadmin') && (
          <button
            onClick={() => handleOpenModal(funct.id)}
            className="absolute top-3 right-6 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 z-10"
          >
            Eliminar
          </button>
        )}
      </div>
    );
  });

  return (<>
  {(userRole === 'admin' || userRole === 'superadmin') && (
            <ModalDelete
                show={showModal}
                id={selectedFunctionId}
                onCancel={handleCloseModal}
                onDelete={handleConfirmDelete}
            />
        )}
    <div className="mt-15 mb-15">
      {functionsMapped.length > 0 ? (
        functionsMapped
      ) : (
        <p className="text-lg text-red-600 my-5">
          NO HAY FUNCIONES DISPONIBLES
        </p>
      )}
    </div>
  </>);
}

export default Functions;