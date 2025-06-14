import { useNavigate } from "react-router";

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
    const date = new Date(funct.date);

    const configDate = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Argentina/Buenos_Aires',
      hour12: false,
    };

    const formatDate = date.toLocaleString('es-AR', configDate);

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

    return (<div className="mt-15 mb-15">
        {functionsMapped}
    </div>)

}

export default Functions;