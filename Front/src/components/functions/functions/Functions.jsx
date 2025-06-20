import { useNavigate } from "react-router";
import { useFormatDate } from "../../../hooks/useFormatDate/useFormatDate";

import FunctionItem from "../functionItem/FunctionItem";

 

const Functions = ({ functionsCinema, id, movie}) => {

  const navigate = useNavigate();

    const handleClick = (movieTitle,functionId, totalSeats,availableSeats,date,movieId) => {

      navigate('/purchase', {
        state: {
          movieTitle,
          functionId: functionId,
          movieId: movieId,
          dateFunction: date,
          totalSeats: totalSeats,
          availableSeats: availableSeats,
        },
      });

    }

    const functionsMapped = functionsCinema
  .filter(f => f.movie_id == id)
  .map((funct) => {
    const formatDate = useFormatDate(funct.date)

    return (
      <div
        key={funct.id}
        onClick={() => handleClick(
          movie.title,
          funct.id,
          funct.total_seats,
          funct.available_seats,
          formatDate,
          funct.movie_id
         )}
        className="cursor-pointer"
      >
        <FunctionItem
          date={formatDate}
        />
      </div>
    );
  });

  return (
    <div className="mt-15 mb-15">
      {functionsMapped.length > 0 ? (
        functionsMapped
      ) : (
        <p className="text-lg text-red-600 my-5">
          NO HAY FUNCIONES DISPONIBLES
        </p>
      )}
    </div>
  );
}

export default Functions;