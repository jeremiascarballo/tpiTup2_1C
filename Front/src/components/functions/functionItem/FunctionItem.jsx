
const FunctionItem = ({ handleClick, movieTitle, functionId, totalSeats, availableSeats, dateFunction, movieId }) => {

  const handleClickItem = () => {
      handleClick(
        movieTitle,
        functionId,
        movieId,
        dateFunction,
        totalSeats,
        availableSeats);
  }

  return (
    <div className={`border border-gray-300 rounded-xl shadow-sm p-4 bg-white my-5 ${
      availableSeats < 1 ? 'opacity-50' : 'hover:shadow-md transition'
    }`}>
      <p className="text-black font-medium">{dateFunction}</p>
      {availableSeats > 1 &&<button 
        className="text-white bg-blue-600 hover:bg-blue-700 font-semibold py-1 px-3 rounded-xl mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleClickItem}
        disabled={availableSeats < 1}
      >
        Comprar
      </button>}

      {availableSeats < 1 && (
        <p className="text-red-600 font-semibold mt-2">No hay asientos disponibles</p>
      )}
    </div>
  );
};

export default FunctionItem; 