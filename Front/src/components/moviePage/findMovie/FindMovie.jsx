import { useEffect, useState } from "react";
import { useParams } from "react-router";

const FindMovie = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Película encontrada:", data);
        setMovie(data);
      })
      .catch(err => console.log(err))
  }, [id]);


  return (
    <div className="grid grid-cols-4 min-h-screen bg-black">
      {/* Imagen ocupa las columnas 1 y 2 */}
      <div className="col-span-2 flex justify-center p-10">
        <div className=" w-full max-w-xs">
          <img src={movie.img} alt={movie.title} className="object-cover w-full h-full rounded" />
        </div>
      </div>

      {/* Información ocupa columnas 3 y 4 */}
      <div className="col-span-2 text-white text-left p-10">
        <div>
          <h1 className="text-5xl mb-2">Título: {movie.title}</h1>
          <h2 className="text-xl mb-2">Duración: {movie.duration}</h2>
          <h2 className="text-xl mb-2">Director: {movie.director}</h2>
          <h2 className="text-xl mb-2">Calificación: {movie.qualification}</h2>
          <p className="text-sm">{movie.description}</p>
        </div>
        <div className="mt-10">
          <h1 className="text-5xl mb-2">ENTRADAS</h1>

        </div>
      </div>
    </div>
  );
}

export default FindMovie;